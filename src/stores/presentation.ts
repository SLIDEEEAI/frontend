import { ref, type CSSProperties } from "vue";
import { defineStore } from "pinia";
import router from "@/router";

import { generateImage } from "@/api/AI/generateImage";
import { generateLongText } from "@/api/AI/chatGPT/generateLongText";

import { getPresentation } from "@/api/getPresentation";
import { savePresentation } from "@/api/savePresentation";
import { getRandomTheme, getThemeByName, generateTheme } from './themes';
import templates from "@/stores/templates/index";

import { testPres } from '@/types/Presentation';
import { type TemplateName } from "@/stores/templates/types/slideTemplate";
import { type ThemeName } from "@/stores/themes/types/ThemeName";
import { type ThemeOptions } from "@/stores/themes/types/PresTheme";

import LimitedStack from "@/composables/LimitedStack";

// начать декомпозицию стора на функции
// import addPictureToBox from './editorFunctions/images/AddPictureToBox';

import type {  
    RGBcolor,  
    PresentationObject,  
    Presentation,  
    Slide,  
    TextBox,  
    PictureBox,  
    TableBox,
    resizedOrGrabedData,  
    ContentType,  
    ContentBlock, 
    PictureSourceType,
    PresThemeOptions
} from "@/types/Presentation";

export const usePresentationStore = defineStore( 'presentation', () => {

    const presTest : PresentationObject = testPres;

    const activePresentationId = ref<number | null>(null)
    const activePresentation = ref<Presentation | null>(null)

    const activeSlideIndex = ref<number>(0)

    const historyLimit = 15
    const history = ref(new LimitedStack<Presentation>(historyLimit))

    function historyActionReturn() {
        const temp = history.value.pop()
        
        if (temp && activePresentation.value) {
            console.log(temp, 'historyActionReturn');
            console.log(activePresentation.value);

            activePresentation.value.slides = temp.slides
        }
    }

    /**
     * Создаёт новый проект презентации по теме презентации и заголовкам слайдов
     * @param presTheme - тема презентации
     * @param slidesTitles - массив заголовков слайдов
     */    
    async function constructPresentation( presTheme:string, slidesTitles : string[]) {
        
        const context = (title : string) =>
        `Тема презентации - "${presTheme}".`;

        createEmptyProject(presTheme)

        const theme = await generateTheme(presTheme)

        if (theme) {
            setThemeByTemplateOptions(theme.options)
        }
        else{
            setThemeByTemplateName(getRandomTheme())
        }

        router.push({path:'/editor/new'})

        const templatesMap = Object.keys(templates) as TemplateName[]

        slidesTitles.forEach( ( title, index ) => {
            addEmptySlide(title)

            const tempIndex = index % (templatesMap.length)

            fillSlideByTemplate(templatesMap[tempIndex], index, title, context(title))
        })

    }

    /** Устанавливает тему презентации по шаблону из массива themes
     * @param name - имя шаблона темы 
     */
    function setThemeByTemplateName (name : ThemeName) {
        ifPresentation((pres)=>{
            // console.log('устанавливаю тему');
            const options = getThemeByName(name)
            // console.log('тема', options); 
            if (options) {
                pres.theme.name = name
                pres.theme.background_color = options.background_color
                pres.theme.objects_color = options.objects_color
                pres.theme.font_info.titles.color = options.font_info.titles.color
                pres.theme.font_info.titles.bold = options.font_info.titles.bold
                pres.theme.font_info.titles.italic = options.font_info.titles.italic
                pres.theme.font_info.main_texts.color = options.font_info.main_texts.color
                pres.theme.font_info.main_texts.bold = options.font_info.main_texts.bold
                pres.theme.font_info.main_texts.italic = options.font_info.main_texts.italic
                // console.log('тема установлена'); 
            }
        })
    } 

    /** Устанавливает тему презентации по шаблону из массива themes
     * @param name - имя шаблона темы 
     */
    function setThemeByTemplateOptions (options : ThemeOptions) {
        ifPresentation((pres)=>{
            pres.theme.background_color = options.background_color
            pres.theme.objects_color = options.objects_color
            pres.theme.font_info.titles.color = options.font_info.titles.color
            pres.theme.font_info.titles.bold = options.font_info.titles.bold
            pres.theme.font_info.titles.italic = options.font_info.titles.italic
            pres.theme.font_info.main_texts.color = options.font_info.main_texts.color
            pres.theme.font_info.main_texts.bold = options.font_info.main_texts.bold
            pres.theme.font_info.main_texts.italic = options.font_info.main_texts.italic
        })
    } 

    /**
     * Заполнение пустого слайда элементами по шаблону
     * @param {TemplateName} templateName - Имя шаблона слайда из каталогов шаблонов
     * @param {number} slideIndex - индекс заполняемого слайда
     * @param {string} title - тема слайда
     */
    async function fillSlideByTemplate(templateName:TemplateName, slideIndex:number, title?:string, context ?: string) {

        const template = templates[templateName]

        // Заполнение текстбоксов

        if (template.textboxes.length) {
            
            template.textboxes.forEach((temp, index) => {

                addEmptyTextbox(slideIndex, temp)
                if (title && context) {
                    addTextToTextbox(slideIndex, index, title, context + `Сгенерируй текст для слайда с заголовком "${title}"`)
                    // .then((data)=>{
                    //     console.log('Добавил текст в текстбокс ' + index);
                    // })
                }
            });
        }

        if (template.pictures.length) {
            template.pictures.forEach((temp, index) => {
                addEmptyPictureBox(slideIndex, temp)
                if (title && context && activePresentation.value) { 
                    ifPresentation(pres => {
                        pres.slides[slideIndex].content.pictures[index].loading = true           
                        generateImage(context + `Сгенерируй изображение для слайда с заголовком "${title}"`)
                        .then( result => {
                            if (result) {
                                addPictureToBox(slideIndex, index, { type : 'localSrc', url : result.images[0].url })
                            }
                        } )
                        .finally(() => 
                            pres.slides[slideIndex].content.pictures[index].loading = undefined
                        )
                    })
                }

                // addUrlToPicturebox(slideIndex, index, title)
            })
        }
    }


    // Начать декомпозицию стора на функции

    interface ImageData {
        url : string | ArrayBuffer,
        type : PictureSourceType
    }

    function addPictureToBox(slideIndex : number, boxIndex : number, imageData : ImageData ) {
        ifPresentation( pres => {
            const box = pres.slides[slideIndex].content.pictures[boxIndex]
            box.type = imageData.type
            box.url = imageData.url
        })
    }


    async function addTextToTextbox(slideIndex:number, textboxIndex:number, title: string, context : string) {
        ifPresentation(async function(pres) {
            const box = pres.slides[slideIndex].content.textboxes[textboxIndex]
            box.loading = true;
            if (textboxIndex == 0) {
                box.text = title
            }
            else{
                const responce = await generateLongText(context)
                if (responce) {
                    const box = pres.slides[slideIndex].content.textboxes[textboxIndex]
                    box.text = responce.long_text
                }
            }
            box.loading = undefined;
            // const box = pres.slides[slideIndex].content.textboxes[textboxIndex]
            // box.text = 'Тестовый текст'
        })
    }

    // async function addUrlToPicturebox(slideIndex:number, pictureboxIndex:number, title : string) {
    //     const slideTitle = title
    //     console.log(slideTitle);
        
    //     ifPresentation(function(pres){
    //         const box = pres.slides[slideIndex].content.pictures[pictureboxIndex]
    //         box.url = 'https://cdn1.ozone.ru/s3/multimedia-i/6447014826.jpg'
    //         box.type = "url"
    //     })
    // }


    function createEmptyProject(theme:string) {
        activePresentation.value = {
            group: null,
            date_created : Date.now(),
            date_edited : Date.now(),
            favourite : false,
            removed : false,
            len_slides : 0,
            title : theme,
            theme : {
                background_color : [111,111,111],
                objects_color : [111,111,111],
                font_info : {
                    titles : {
                        name : 'Arial',
                        bold : true,
                        italic : false,
                        size : 42,
                        color : [215,215,215]
                    },
                    main_texts : {
                        name : 'Arial',
                        bold : false,
                        italic : false,
                        size : 18,
                        color : [255,255,255]
                    }
                }
            },
            slides : []
        }
    }



    // if (localStorage.getItem('activePresentation') !== null) {
    //     activePresentation.value = localStorage.getItem('activePresentation')
    // }
    // else{
    //     activePresentation.value = presTest
    // }



    /** Функция deepClone используется для создания глубокой копии объекта. 
        Это необходимо, чтобы новый элемент массива был полностью независим от оригинального элемента 
        (то есть не был ссылкой на него). 
        Важно отметить, что использование JSON.parse(JSON.stringify(obj)) для глубокого клонирования является простым, 
        но не всегда идеальным решением, поскольку оно не поддерживает копирование функций, 
        Date объектов, RegExp объектов, Map, Set и т.д. внутри клонируемого объекта. 
        В сложных случаях лучше использовать специализированные библиотеки, такие как Lodash и его метод _.cloneDeep.
     * @param obj - объект клонирования
     */
    function deepClone(obj : object) {
        return JSON.parse(JSON.stringify(obj));
    }


    function updateSlideIndexes(slides : Slide[]){
        slides.forEach((slide, index) => {
            slide.index = index
        })
    }

    const ifPresentation = <T>( handler : (pres : Presentation) => T | false ) => {
        if ( !activePresentation.value ) 
            return false
        else
            return handler(activePresentation.value)
    }

    const addEmptyTextbox = ( slideIndex : number, tbTemp ?: Partial<TextBox> ) => {
        return ifPresentation(function(pres){
            const newTextbox : TextBox = {
                width : tbTemp?.width || '400px',
                height : tbTemp?.height || '150px',
                top : tbTemp?.top || '40px',
                left : tbTemp?.left || '40px',
                align : tbTemp?.align || 'left',
                italic : tbTemp?.italic || null,
                bold : tbTemp?.bold || null,
                font_size : tbTemp?.font_size || null,
                background_color : tbTemp?.background_color || null,
                type : tbTemp?.type || 'p',
                text : '',
                underline : null,
                lineThrough : null,
                color : null
            }
            return pres.slides[slideIndex].content.textboxes.push(newTextbox) - 1
        })  
    }

    const addEmptyPictureBox = ( slideIndex : number, pTemp ?: Partial<PictureBox> ) => {

        return ifPresentation(function(pres){
            const newPicturebox : PictureBox = {
                width : pTemp?.width || '600px',
                height : pTemp?.height || '600px',
                top : pTemp?.top || '40px',
                left : pTemp?.left || '1280px',
                background_color : pTemp?.background_color || null,
                type : pTemp?.type || undefined,
                url : pTemp?.url || ''
            }

            newPicturebox.type = 'localSrc'
            
            return pres.slides[slideIndex].content.pictures.push(newPicturebox) - 1
        })  
    }

    const addEmptyTable = ( slideIndex : number, pTemp ?: Partial<TableBox> ) => {

        ifPresentation(function(pres){
            const newTable : TableBox = {
                width : pTemp?.width || '600px',
                height : pTemp?.height || '600px',
                top : pTemp?.top || '40px',
                left : pTemp?.left || '1280px',
                background_color : pTemp?.background_color || null,
                font_size : pTemp?.font_size || 28,
                columns : pTemp?.columns || [ '', '', '' ],
                rows : pTemp?.rows || [
                    [ '', '', '' ],
                    [ '', '', '' ],
                ]
            }
            pres.slides[slideIndex].content.tables.push(newTable)
        })
    }

    const removeContentBox = (slideIndex : number, boxIndex : number, contentType : ContentType) => {
        ifPresentation(function(pres){
            let box : ContentBlock[];

            switch (contentType) {
                case 'TextBox':
                    box = pres.slides[slideIndex].content.textboxes
                    break;
                case 'PictureBox':
                    box = pres.slides[slideIndex].content.pictures
                    break;
                case 'TableBox':
                    box = pres.slides[slideIndex].content.tables
                    break;
                default:
                    console.log('Для данного типа контента функция не описана...');
                    return;
            }

            box.splice(boxIndex, 1);
        })
    }


    /**
     * Создаёт новый пустой слайд в массиве презентации
     * @param title - Заголовок слайда
     */
    const addEmptySlide = (title ?: string) => {

        return ifPresentation (function(pres){
            const newSlideIndex = pres.slides.length;
            pres.len_slides++
            pres.slides.push({
                index : newSlideIndex,
                theme : {
                    background_color : null,
                    background_img : null
                },
                content : {
                    textboxes : [],
                    pictures : [],
                    tables : [],
                    figures : [],
                    graphics : [],
                }
            })
            return newSlideIndex;
        })
    }

    const removeSlide = (index:number) => {
        ifPresentation(function(pres){
            try{
                pres.len_slides--
                pres.slides.splice(index, 1);
                updateSlideIndexes(pres.slides)
            }
            catch($e){
                console.log($e);
                console.log('ошибка вверху');
            }
        })
    }


    function dublicateSlide(index:number) {
        ifPresentation(function(pres){
            // Создаем глубокую копию элемента
            const slideCopy : Slide = deepClone(pres.slides[index]);
            try{
                // // Вставляем копию элемента сразу после оригинального элемента
                pres.slides.splice(index + 1, 0, slideCopy);
                updateSlideIndexes(pres.slides)
            }
            catch($e){
                console.log('ошибка внизу');
                console.log($e);
                console.log('ошибка вверху');
            }
        })
      }


    
    const changeTextboxContent = (newText:string, slideIndex:number, textboxIndex:number) => {
        ifPresentation(function(pres){
            console.log(`изменяю text на значение "${newText}" => ${slideIndex} слайд, ${textboxIndex} текстбокс`);
            pres.slides[slideIndex].content.textboxes[textboxIndex].text = newText
        })
    }


    const addUrlToPictureBox = (url : string, slideIndex:number, pictureboxIndex:number , type : PictureSourceType = 'data') => {
        if (activePresentation.value) {
            console.log(`изменяю url на значение "${url}" => ${slideIndex} слайд, ${pictureboxIndex} картинка`);
            activePresentation.value.slides[slideIndex].content.pictures[pictureboxIndex].url = url
            activePresentation.value.slides[slideIndex].content.pictures[pictureboxIndex].type = type
        }
    }


    const changeBoxSizeAndPosition = (data:resizedOrGrabedData, slideIndex:number, contentType : ContentType, boxIndex:number, scaleCoefficient:number) => {

        ifPresentation(function(pres){

            history.value.push(pres)

            console.log('тест');
            console.log(`изменяю width на значение ${data.width} => ${slideIndex} слайд, ${boxIndex} текстбокс`);

            let box : ContentBlock;

            switch (contentType) {
                case 'TextBox':
                    box = pres.slides[slideIndex].content.textboxes[boxIndex]
                    break;
                case 'PictureBox':
                    box = pres.slides[slideIndex].content.pictures[boxIndex]
                    break;
                case 'TableBox':
                    box = pres.slides[slideIndex].content.tables[boxIndex]
                    break;
                default:
                    console.log('Для данного типа контента функция не описана...');
                    return;
            }

            box.width = Number(data.width/scaleCoefficient).toFixed(2) + 'px'
            box.height = Number(data.height/scaleCoefficient).toFixed(2) + 'px'
            box.top = Number(data.top/scaleCoefficient).toFixed(2) + 'px'
            box.left = Number(data.left/scaleCoefficient).toFixed(2) + 'px'
        })
        
    }

    const getProjectById = async (id: number | string) => {
        const presentation = await getPresentation(id)
        return presentation
    }

    const saveProject = async (obj : PresentationObject) => {
        let status = false;
        await setTimeout(async () => {
            const responce = await savePresentation(obj)
            console.log('ответ с сохранения');
            console.log(responce);
            if (responce == "saved") {
                status = true
            }
        }, 1000);
        return status
    }

    const setPresentation = (obj : PresentationObject) : boolean => {
        const savedId = localStorage.getItem('activePresentationId')
        const savedPresentation = localStorage.getItem('activePresentationObject')

        history.value = new LimitedStack<Presentation>(historyLimit)

        if (savedId === obj.id.toString() && savedPresentation ) {
            activePresentationId.value = obj.id
            activePresentation.value = JSON.parse(savedPresentation)
            console.log('берём из локал сторадж');
            return true
        }
        else{
            activePresentationId.value = obj.id
            activePresentation.value = obj.json
            localStorage.setItem('activePresentationId', obj.id.toString())
            localStorage.setItem('activePresentationObject', JSON.stringify(obj.json))
            console.log('берём из responce');
            return false
        }
    }

    const openInEditor = async (id : number) => {
        
        const presentation = await getPresentation(id)
        
        if (typeof presentation != 'undefined' && typeof presentation != 'number') {
            setPresentation(presentation)
            router.push({path:'/editor/'+id})
        }
        else{
            console.log('преза пустая');
        }

    }
    const openInNewTabEditor = async (id : number) => {
        
        const routeData = router.resolve({path:'/editor/'+id});

        window.open(routeData.href, '_blank');

    }

    function getRGB(params: RGBcolor): string {
        return `rgb(${params[0]},${params[1]},${params[2]})`
    }

    const getWithoutPx = (pxValue: string | number) => {
        if (typeof pxValue == 'string') 
            return +pxValue.slice(0, pxValue.length - 2)   
        else 
            return pxValue
    }


    function updateObjectProperties<T extends object>(obj1: T, obj2: T) : boolean {
        obj1 = obj2
        return true
        // const obj1Keys = Object.keys(obj1) as (keyof T)[];
        // // const obj2Keys = Object.keys(obj2) as (keyof T)[];
        // // Проверяем, что оба объекта имеют одинаковый набор свойств
        // // if (obj1Keys.length !== obj2Keys.length || obj1Keys.some((key) => !obj2Keys.includes(key))) {
        // //     // throw new Error('Objects have different properties');
        // //     console.log('Objects have different properties');
        // //     console.log(obj1Keys);
        // //     console.log(obj2Keys);
            
        // //     return false
        // // }
        // obj1Keys.forEach((key) => {
        //     if (obj1[key] !== obj2[key]) {
        //         obj1[key] = obj2[key];
        //         console.log('Изменён', key);
        //     }
        // });
        // return true
    }


    const updateTextBox = (slideIndex : number, tbIndex : number, newTB : TextBox) => {

        ifPresentation(function (pres) {
            // if ( updateObjectProperties(pres.slides[slideIndex].content.textboxes[tbIndex], newTB))
                // console.log('ТекстБокс Обновлён')
            pres.slides[slideIndex].content.textboxes[tbIndex] = newTB
        })
    }

    const updateTableBox = (slideIndex : number, tableIndex : number, newTable : TableBox) => {
        ifPresentation(function (pres) {
            if ( updateObjectProperties(pres.slides[slideIndex].content.tables[tableIndex], newTable) )
                console.log('Таблица обновлена')
        })
    }

     
    const updateTextInTableCeil = (slideIndex : number, tableIndex : number, row: number, ceil : number, text : string) => {
        ifPresentation(function (pres) {
            const table = pres.slides[slideIndex].content.tables[tableIndex]
            if (row == 0) 
                table.columns[ceil] = text
            else
                table.rows[row-1][ceil] = text

            console.log('Обновлена ячейка', row, ceil)
        })
    }
    updateTextInTableCeil

    const parsePresentationStyles = (presentation : Presentation) => {
        // console.log(presentation.theme.font_info.main_texts.italic);
        
        const style : CSSProperties = {
            "backgroundColor" : getRGB(presentation.theme.background_color),
            "fontFamily" : presentation.theme.font_info.main_texts.name,
            "fontSize" : presentation.theme.font_info.main_texts.size ? presentation.theme.font_info.main_texts.size * PPICoef + "px" : 18 + 'px',
            "fontWeight": presentation.theme.font_info.main_texts.bold ? 700 : 400,
            // "fontStyle" : presentation.font_info.bold ? 'italic' : 'inherit'
            "fontStyle" : presentation.theme.font_info.main_texts.italic ? 'italic' : 'normal'
        }
        // console.log(style);
        
        return style
    }

    const parsePresentationTheme = (theme : PresThemeOptions) => {

        // console.log('тест темы');
        // console.log(theme);

        const style : CSSProperties = {
            "backgroundColor" : getRGB(theme.background_color),
            "fontFamily" : theme.font_info.main_texts.name,
            "fontSize" : theme.font_info.main_texts.size ? theme.font_info.main_texts.size * PPICoef + "px" : 18 + 'px',
            "fontWeight": theme.font_info.main_texts.bold ? 700 : 400,
            "fontStyle" : theme.font_info.main_texts.italic ? 'italic' : 'normal'
        }
        return style
    }


    // ====== Пока что так, позже нужно расчитать =======
    const PPICoef = 6/3;

    const ptToPx = (pt : number) => pt * PPICoef
    
    // ==================================================
     

    /** 
     * возвращает ресайзнутый объект стилей по коеффициенту 
     * @param {CSSProperties} presStyle - глобальные CSS-свойства презентации
     * @param {number} scaleCoefficient - размерный коеффициент 
     */
    const resizeStyleByCoefficient = (presStyles : CSSProperties, scaleCoefficient : number) : CSSProperties => {

        return {
            backgroundColor : presStyles.backgroundColor ? presStyles.backgroundColor : 'inherit',
            fontFamily : presStyles.fontFamily ? presStyles.fontFamily : 'inherit',
            fontSize : presStyles.fontSize ? getWithoutPx(presStyles.fontSize) * scaleCoefficient + 'px' : 18 * scaleCoefficient + 'px' ,
            fontWeight : presStyles.fontWeight
        }
    }

    const getPresentationTheme = () => activePresentation.value?.theme

    return {
        activePresentation,
        activeSlideIndex,
        presTest,

        historyActionReturn,

        getPresentationTheme,

        ifPresentation,

        constructPresentation,

        saveProject,
        
        getProjectById,
        setPresentation,
        openInEditor,
        openInNewTabEditor,
        
        ptToPx,
        getWithoutPx,
        getRGB,

        parsePresentationStyles,
        parsePresentationTheme,
        resizeStyleByCoefficient,
    
        // Методы изменения элементов презентации
        changeBoxSizeAndPosition,
        changeTextboxContent,
        updateTextBox,
        updateTableBox,
        updateTextInTableCeil,
        
        addUrlToPictureBox,
        
        dublicateSlide,
        addEmptySlide,
        fillSlideByTemplate,
        setThemeByTemplateName,
        setThemeByTemplateOptions,

        addEmptyTextbox,
        addEmptyPictureBox,
        addEmptyTable,

        removeSlide,
        removeContentBox
    }
} )

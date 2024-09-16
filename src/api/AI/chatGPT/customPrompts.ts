import axios from 'axios';
import { useUserStore } from "@/stores/user";

import API_URL from '@/api/apiUrl'

const url = API_URL + 'presentation/gpt/request';

interface Responce {
    gpt_response : string
}

interface ColorSchema {
    background_color : [number,number,number],
    objects_color : [number,number,number],
    titles : [number,number,number],
    main_texts: [number,number,number]
}
export const generateThemeColors = async ( theme : string ) => {


    const prompt = 
    // theme;
    `Предложи цветовую палитру в формате rgb для презентации по теме "${theme}".
    Дай ответ в формате такой и только такой json-структуры:
    {
        background_color : [r,g,b],
        objects_color : [r,g,b],
        titles : [r,g,b],
        main_texts: [r,g,b]
    }.
    Акцентный цвет всегда должен быть цветом фона.
    Цвета текста должны быть на контрасте с цветом фона и хорошо читаться.
    Старайся использовать более мягкие и гармоничные цвета.
    Только два цвета могут быть одинаковыми, если это будет требует тема.
    Пиши только полный json и не давай никаких объяснений.`;

    const postData = { gpt_request : prompt }


    try {
        const response = await axios.post<Responce>(url, postData, {
            headers : {
                Authorization : `Bearer ${useUserStore().accessToken}`
            }
        })
        console.log('Ответ получен');
        console.log(response.data);
        console.log(JSON.parse(response.data.gpt_response));
        const jsonColorSchema = JSON.parse(response.data.gpt_response) as ColorSchema
        return jsonColorSchema;
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response);
        } else {
            console.log('unexpected error: ', error);
        }
    }
}
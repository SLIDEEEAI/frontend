import type { PictureSourceType } from '@/types/Presentation';
import { usePresentationStore } from '@/stores/presentation';

const { ifPresentation } = usePresentationStore()

interface ImageData {
    url : string | ArrayBuffer,
    type : PictureSourceType
}

export default function addPictureToBox(slideIndex : number, boxIndex : number, imageData : ImageData ) {
    ifPresentation( pres => {

        console.log('делаю имаге');

        const box = pres.slides[slideIndex].content.pictures[boxIndex]
        box.type = imageData.type
        box.url = imageData.url

        console.log('сделано');
        
    })
}
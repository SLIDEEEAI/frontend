import axios from 'axios';
import { useUserStore } from "@/stores/user";

import API_URL from '@/api/apiUrl'

interface GeneratedImage {
    id : number
    url : string
}

export const generateImage = async ( text_theme : string ) => {
    
    console.log(text_theme);
    
    const postData = { presentation_theme: text_theme }
    console.log('Ждём ответ');

    try {
        const response = await axios.post<{images:GeneratedImage[]}>(API_URL + 'presentation/images/generate', postData, {
            headers : {
                Authorization : `Bearer ${useUserStore().accessToken}`
            }
        })
        console.log('Ответ: картинка получена');
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response);
        } else {
            console.log('unexpected error: ', error);
        }
    }
}
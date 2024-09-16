import axios from 'axios';
import { useUserStore } from "@/stores/user";

import API_URL from '@/api/apiUrl'

export const generateLongText = async ( text_theme : string ) => {
    
    const postData = { presentation_theme: text_theme, max_tokens : 500 }
    console.log('Ждём ответ');

    try {
        const response = await axios.post<{long_text:string}>(API_URL + 'presentation/long_text/generate', postData, {
            headers : {
                Authorization : `Bearer ${useUserStore().accessToken}`
            }
        })
        console.log('Ответ получен');
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
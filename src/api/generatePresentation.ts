import axios from 'axios';
import { useUserStore } from "@/stores/user";
import { type PresentationObject } from "@/types/Presentation";

import API_URL from './apiUrl'

export const generatePresentation = async ( headtitles : string[] ) => {
    const postData = { themes: headtitles }
    console.log('Ждём ответ');

    try {
        const response = await axios.post<PresentationObject>(API_URL + 'presentation/slides/generate', postData, {
            headers : {
                Authorization : `Bearer ${useUserStore().accessToken}`
            }
        })
        console.log('Ответ получен');
        console.log(response.data);
        console.log(typeof response.data);
        return response.data;
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response);
            // return error.message;
        } else {
            console.log('unexpected error: ', error);
            // return 'An unexpected error occurred';
        }
    }
}
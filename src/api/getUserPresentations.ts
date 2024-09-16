import axios from 'axios';
import { useUserStore } from "@/stores/user";
import type { PresentationObject } from '@/types/Presentation';

import API_URL from './apiUrl'

interface getUserPresentationsResponce {
    presentations : PresentationObject[]
}

export const getUserPresentations = async ( ) => {
    // console.log('Ждём ответ');
    try {
        const response = await axios.post<getUserPresentationsResponce>(API_URL + 'user/presentations', {}, {
            headers : {
                Authorization : `Bearer ${useUserStore().accessToken}`
            }
        })
        // console.log('Ответ получен');
        return response.data;
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error);
            // return error.message;
        } else {
            console.log('unexpected error: ', error);
            // return 'An unexpected error occurred';
        }
    }
}
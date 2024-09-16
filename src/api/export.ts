import axios from 'axios';
import { useUserStore } from "@/stores/user";
import type { PresentationObject } from '@/types/Presentation';

import API_URL from './apiUrl'

export const exportPptx = async ( id : number | string ) => {
    const postData = { id: id, type : 'pdf' }
    try {
        const response = await axios.post<PresentationObject>(API_URL + 'presentation/export', postData, {
            headers : {
                Authorization : `Bearer ${useUserStore().accessToken}`
            }
        })
        // console.log('Ответ получен');
        console.log(response);
        return response;  
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
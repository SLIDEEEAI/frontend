import axios from 'axios';
import { useUserStore } from "@/stores/user";
import type { PresentationObject } from '@/types/Presentation';

import API_URL from './apiUrl'

export const getPresentation = async ( id : number | string ) => {
    const postData = { id: id }
    // console.log('Ждём ответ');
    try {
        const response = await axios.post<PresentationObject>(API_URL + 'presentation/get', postData, {
            headers : {
                Authorization : `Bearer ${useUserStore().accessToken}`
            }
        })
        // console.log('Ответ получен');
        // console.log(response.data);
        return response.data;  
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // console.log(error);
            return error.response?.status;
        } else {
            // console.log('unexpected error: ', error);
            return 500;
        }
    }
}
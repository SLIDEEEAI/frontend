import axios from 'axios';
import { useUserStore } from "@/stores/user";
import type { PresentationObject } from '@/types/Presentation';

import API_URL from './apiUrl'

export const savePresentation = async ( obj : PresentationObject ) => {
    const postData = obj
    try {
        const response = await axios.post(API_URL + 'presentation/save', postData, {
            headers : {
                Authorization : `Bearer ${useUserStore().accessToken}`
            }
        })
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
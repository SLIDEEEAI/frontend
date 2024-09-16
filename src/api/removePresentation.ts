import axios from 'axios';
import { useUserStore } from "@/stores/user";

import API_URL from './apiUrl'

export const removePresentation = async ( id : number ) => {
    const postData = { id : id }
    // console.log('Ждём ответ');
    try {
        const response = await axios.post(API_URL + 'presentation/delete', postData, {
            headers : {
                Authorization : `Bearer ${useUserStore().accessToken}`
            }
        })
        // console.log('Ответ получен');
        // console.log(response.data);
        if (response.data != 'deleted') 
            return response.data 
        return true
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
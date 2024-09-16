import axios from 'axios';

import API_URL from './apiUrl'

export const testApi = async () => {
    // const postData = { id: id, type : 'pdf' }
    try {
        const response = await axios.post(API_URL + 'paykeeper/webhook/')
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
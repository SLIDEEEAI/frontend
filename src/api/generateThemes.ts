import axios from 'axios';
import { useUserStore } from "@/stores/user";

import API_URL from './apiUrl'

interface generateThemesResponce {
    themes : string[]
}

export const generateThemes = async (presentationTheme: string, slidesNum: number) => {
    const postData = { theme: presentationTheme, slides_count: slidesNum }
    console.log('Ждём ответ');

    try {
        const { data } = await axios.post<generateThemesResponce>(API_URL + 'presentation/themes/generate', postData, {
            headers : {
                Authorization : `Bearer ${useUserStore().accessToken}`
            }
        })
        console.log('Ответ получен');
        return data;
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
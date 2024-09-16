import axios from 'axios';
import API_URL from './apiUrl'

export const getBalance = async ( userId : number, accessToken : string ) => {

    const postData = { id : userId }
    // console.log('Ждём ответ');
    try {
        const response = await axios.post<{author: number, balance: number}>(API_URL + 'presentation/getbalance', postData, {
            headers : {
                Authorization : `Bearer ${accessToken}`
            }
        })
        // console.log('Ответ получен');
        // console.log(response.data);
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
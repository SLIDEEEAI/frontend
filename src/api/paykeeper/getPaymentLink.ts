import axios from 'axios';
import { useUserStore } from "@/stores/user";
import API_URL from '../apiUrl'

interface PostData {
    "pay_amount": number,
    "clientid": number | string,
    "orderid": number | string,
    "client_email": string,
    "service_name": string,
    "client_phone": string
}

export const getPaymentLink = async ( postData : PostData ) => {

    console.log('Ждём ответ');
    try {
        const response = await axios.post<{link : string}>(API_URL + 'paykeeper/get_payment_link', postData, {
            headers : {
                Authorization : `Bearer ${useUserStore().accessToken}`
            }
        })
        console.log('Ответ получен');
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
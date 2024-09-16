import axios, { isAxiosError } from 'axios';
import { useUserStore } from "@/stores/user";

import API_URL from './apiUrl'

interface refreshAccessTockens {
    refresh: string,
    access: string
}

interface loginUserResponce extends refreshAccessTockens { }

interface registerUserResponce {
    email: string,
    username: string,
    role: number,
    token: refreshAccessTockens
}

export const loginUser = async (email: string, password: string) => {
    const postData = { email: email, password: password }
    console.log('Ждём ответ');

    try {
        const response = await axios.post<loginUserResponce>(API_URL + 'users/login', postData,
        {
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
        })

        console.log('Ответ получен');
        return response.data;
    } catch (error) {
        
        if (isAxiosError(error)) {
            console.log('axios error: ', error);
            return error.response?.data   
        }
        console.log('unexpected error: ', error);
        return error
    }
}

export const registerUser = async (username: string, email: string, password: string, role: 1 | 2 | 3) => {
    const postData = { username: username, email: email, password: password, role: role }
    console.log('Ждём ответ');

    try {
        const response = await axios.post<registerUserResponce>(API_URL + 'users/registration', postData,
        {
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
        })

        console.log('Ответ получен');
        return response.data;
    } catch (error) {

        if (isAxiosError(error)) {
            console.log('axios error: ', error);
            return error.response?.data   
        }
        console.log('unexpected error: ', error);
        return error
    }

} 

export const changeUserPassword = async (password: string, newPassword: string) => {
    const postData = { password: password, new_password: newPassword }
    console.log('Ждём ответ');

    try {
        const response = await axios.post<registerUserResponce>(API_URL + 'users/change/password', postData, {
            headers : {
                Authorization : `Bearer ${useUserStore().accessToken}`
            }
        })
        console.log('Ответ получен');
        return response.data;
    } catch (error) {

        if (isAxiosError(error)) {
            console.log('axios error: ', error);
            return error.response?.data   
        }
        console.log('unexpected error: ', error);
        return error
    }
}

export const refreshUserToken = async (refreshToken: string) => {
    const postData = { refresh : refreshToken }
    console.log('Ждём ответ');

    try {
        const response = await axios.post<{access : string}>(API_URL + 'users/login/refresh', postData, {
            headers : {
                Authorization : `Bearer ${useUserStore().accessToken}`
            }
        })
        console.log('Ответ получен');
        return response.data;
    } catch (error) {

        // if (isAxiosError(error)) {
        //     console.log('axios error: ', error);
        //     return error.response?.data   
        // }
        // console.log('unexpected error: ', error);
        // return error

        return false
    }
}
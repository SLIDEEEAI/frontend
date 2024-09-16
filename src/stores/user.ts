import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from "vue-router";

import { type LoggedUser } from '@/types/User';

import { getBalance } from '@/api/getBalance';

import * as JWT from 'jwt-decode';

interface decodedJWT extends JWT.JwtPayload{
    user_id: number,
    username: string,
    email: string
}

export const useUserStore = defineStore('user', () => {
    
    const router = useRouter();
    
    
    const isLogged = ref<boolean>(false)

    // const ifLogged = <T>( handler : (pres : Presentation) => T | false ) => {
    //     if ( !activePresentation.value ) 
    //         return false
    //     else
    //         return handler(activePresentation.value)
    // } 

    const accessTokenInLocalStorage = localStorage.getItem('accessToken')
    const refreshTokenInLocalStorage = localStorage.getItem('refreshToken')
    
    const accessToken = ref<string>('')
    const refreshToken = ref<string>('')

    const currentUser = ref<LoggedUser>({
        id: 0,
        name: '',
        email: '',
        balance: 0
    })

    const userLogoUrl = ref<string | null>(null)
    const userInitials = computed(() => currentUser.value.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase())

    const setTokens = (access:string, refresh:string) => {
        accessToken.value = access
        refreshToken.value = refresh
    }

    const removeTokens = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        accessToken.value = ''
        refreshToken.value = ''
    }

    const setCurrentUser = () => {

        const decodedJwt : decodedJWT = JWT.jwtDecode(accessToken.value)

        currentUser.value.id = decodedJwt.user_id
        currentUser.value.name = decodedJwt.username
        currentUser.value.email = decodedJwt.email
        isLogged.value = true
    }

    const updateUserBalance = async () => {
        console.log('загружаю баланс');
        
        const result = await getBalance(currentUser.value.id, accessToken.value)
        if (result) {
            currentUser.value.balance = result.balance
            console.log('баланс -', currentUser.value.balance);
            
        }
    }

    // const login = async (email : string, password : string) => {
    //     const response = await loginUser(email, password)
    //     try{
    //         setTokens(response.access, response.refresh)
    //         setCurrentUser()
    //         return true
    //     }
    //     catch ($e){
    //         console.log('$e');
    //         console.log(response);
    //         return response;
    //     }
    // }

    const logout = async () => {
        currentUser.value = {
            id: 0,
            name: '',
            email: '',
            balance: 0,
        };
        isLogged.value = false
        localStorage.clear()

        if (router.currentRoute.value.name == 'home') {
            window.location.reload()
        }
        else{
            router.push({ name: "home" })
        }
        return false;
    }

    try {
        if (accessTokenInLocalStorage && refreshTokenInLocalStorage) {
            accessToken.value = accessTokenInLocalStorage
            refreshToken.value = refreshTokenInLocalStorage
            setCurrentUser()
            isLogged.value = true
            updateUserBalance()
        }
    } catch (error) {
        console.log('токенов нет в локал сторадж');
    }


    watch(accessToken, () => {
        localStorage.setItem('accessToken', accessToken.value)
        updateUserBalance()
    })
    watch(refreshToken, () => {
        localStorage.setItem('refreshToken', refreshToken.value)
        updateUserBalance()
    })


    return { 
        currentUser, 
        isLogged, 

        userLogoUrl,
        userInitials,

        accessToken,
        refreshToken,
        setCurrentUser, 
        setTokens,
        updateUserBalance,

        // login,
        logout, 
    }
})
<script setup lang="ts">

import { ref } from 'vue';
import router from '@/router';

import { loginUser } from "@/api/authUser";
import { useUserStore } from '@/stores/user';
import { useNotificationStore } from '@/stores/notification';

const { showNotification } = useNotificationStore();

const userStore = useUserStore();

const isLoading = ref<boolean>(false)

const email = ref<string>('')
const password = ref<string>('')

const rememberPass = ref<boolean>(false)

const errors = ref<{
    detail : string
}>({
    detail : ''
})

function resetErrors() {
    errors.value.detail = ''
}

const login = async () => {
    if (email.value && password.value) {
        isLoading.value = true
        const response = await loginUser(email.value, password.value)
        
        try{
            userStore.setTokens(response.access, response.refresh)
            userStore.setCurrentUser()

            const redirect = router.currentRoute.value.query.redirect
            if (redirect) 
                router.push({ path: redirect as string })
            else
                router.push({ name: 'projects' })
            
            showNotification('Вход выполнен', 'success')
        }
        catch($e){
            console.log('error data');
            console.log($e);
            resetErrors()
            if (response.detail) 
                errors.value.detail = response.detail
            console.log('вывожу ошибки');
            console.log(errors.value);
            if (response.detail == 'No active account found with the given credentials') 
                showNotification('Не существует аккаунта с данным логином и паролем.<br> Проверьте ваши поля.', 'warning', true)
            else
                showNotification('Техническая ошибка', 'warning')   
        }
        finally{
            isLoading.value = false
        }

    }
    else {
        showNotification('Заполните поля', 'warning')
    }
}


</script>

<template>
    <form class="login-form" @submit.prevent="login" id="login-form" :class="{ 'loading': isLoading }">

        <div class="auth-wrap__row">
            <h2>Вход</h2>
            <span class="color-light">С возвращением в Slideee!</span>
        </div>
        <div class="auth-wrap__row">

            <ui-input-text 
                :label="'Адрес электронной почты'" 
                :placeholder="'email'" 
                :type="'email'"
                name="test-input" 
                id="test-inp" 
                v-model="email" 
                :class="{'invalid' : errors.detail.length}" 
                :error-message="errors.detail ? 'Проверьте поле на правильность' : ''"
            />

            <ui-input-text 
                :label="'Пароль'" 
                :placeholder="'Введите пароль'" 
                :type="'password'" 
                name="user-pass"
                id="user-pass" 
                v-model="password" 
                :class="{'invalid' : errors.detail.length}" 
                :error-message="errors.detail ? 'Проверьте поле на правильность' : ''"
            />

        </div>
        <div class="auth-wrap__row">
            <div style="display: flex; justify-content: space-between; align-items: center;">

                <label class="input-checkbox" for="rec-pass">
                    <icon-gap-done class="checkbox-gap" :class="{'active' : rememberPass}"/>
                    <input type="checkbox" name="rec-pass" id="rec-pass" v-model="rememberPass"> <span>Запомнить пароль</span>
                </label>

                <RouterLink :to="'/auth/signin?tab=org'" :class="'forgive-password'">Забыли пароль?</RouterLink>
            </div>
            <div class="input-block">

                <ui-button :class="'theme-gradient'" type="submit">Войти</ui-button>

                <span class="color-light signin-link">
                    У вас ещё нет аккаунта?
                    <RouterLink :to="'/auth/signin'" :class="'to-signin'" style="color: var(--color-accent);">Нажмите здесь</RouterLink>
                </span>
            </div>
        </div>
    </form>
</template>

<style scoped>
.login-form.loading {
    opacity: .6;
}

.forgive-password {
    margin-left: auto;
    color: var(--color-text-dim);
}

.forgive-password:hover {
    color: var(--color-link);
}

.signin-link {
    text-align: center;
    margin-top: 25px;
}

.to-signin {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
}


.input-checkbox{
    position: relative;
}
.input-checkbox input{
    border-radius: 7px;
}
.checkbox-gap{
    position: absolute;
    left: 0;top: 0;bottom: 0;
    opacity: 0;
    width: 32px;
    height: 32px;
}
.checkbox-gap.active{
    opacity: 1;
}
</style>
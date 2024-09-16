<script setup lang="ts">

import { computed, ref } from 'vue';

import { type User, type UserRole } from '@/types/User';

import { useUserStore } from '@/stores/user';

import { useNotificationStore } from '@/stores/notification';

import router from '@/router';

const userStore = useUserStore();
const { showNotification } = useNotificationStore();

const isLoading = ref<boolean>(false)

const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const passwordRepeat = ref<string>('')
const agreement = ref<boolean>(false)
const role = ref<UserRole>(1)

const errors = ref<{
    email : string[]
    password : string[]
}>({
    email : [],
    password : []
})

function resetErrors() {
    errors.value.email = []
    errors.value.password =[]
}

const isPasswordsMatch = computed(() => {
    if (password.value)
        return password.value == passwordRepeat.value
    else
        return false
})

const registerDone = ref(false)
const registerResp = ref(null)

import { loginUser, registerUser } from "@/api/authUser";

const signIn = async () => {
    if (email.value && password.value) {
        if (isPasswordsMatch.value) {
            if (agreement.value) {
                isLoading.value = true
                const response = await registerUser(name.value, email.value, password.value, role.value)
                console.log(response);
                
                
                try{
                    // в jwt не вшиты email и username, email приходит с респонсом
                    // пока что так
                    const loginResponse = await loginUser(email.value, password.value)

                    userStore.setTokens(loginResponse.access, loginResponse.refresh)
                    userStore.setCurrentUser()
                    router.push({ name: 'projects' })
                    showNotification('Вы зарегистрированны')
                }
                catch($e){
                    showNotification('Техническая ошибка', 'warning')
                    console.log('error data');
                    console.log($e);
                    resetErrors()
                    if (response.email) { 
                        for (const message in response.email)
                            errors.value.email.push(response.email[message]) 
                    }
                    if (response.password) { 
                        for (const message in response.password)
                            errors.value.password.push(response.password[message])
                    }
                    console.log('вывожу ошибки');
                    console.log(errors.value);
                }
                finally{
                    isLoading.value = false
                }
            }
            else showNotification('Согласитесь с условиями использования', 'warning');
        }
        else showNotification('пароли не совпадают', 'warning');
    }
    else showNotification('Заполните поля')
}

</script>

<template>
    <form class="signin-form" @submit.prevent="signIn" id="signin-form" :class="{ 'loading': isLoading }">
        <div class="auth-wrap__row">
            <h2>Регистрация</h2>
            <span class="color-light">Начните создавать презентации <br>вместе со Slideee!</span>
        </div>

        <div class="auth-wrap__row">

            <ui-input-text 
                :label="'Имя'" 
                :placeholder="'Ваше имя'" 
                :type="'text'" 
                name="user-name" 
                id="user-name"
                v-model="name" 
            />

            <ui-input-text 
                :label="'Адрес электронной почты'" 
                :placeholder="'email'" 
                :type="'email'" 
                name="test-input"
                id="test-inp" 
                v-model="email" 
                :class="{'invalid' : errors.email.length}" 
                :error-message="errors.email[0]"
            />

            <ui-input-text 
                :label="'Пароль'" 
                :placeholder="'Введите пароль'" 
                :type="'password'" 
                name="user-pass"
                id="user-pass" 
                v-model="password" 
                :class="{'invalid' : errors.password.length}" 
                :error-message="errors.password[0]"
            />

            <ui-input-text 
                :label="'Повторите пароль'" 
                :placeholder="'Повторите пароль'" 
                :type="'password'"
                name="user-pass-repeat" 
                id="user-pass-repeat" 
                v-model="passwordRepeat" 
            />

            <!-- <div class="input-block">
                <select v-model="role" name="user-role" id="user-role" placeholder="Ваша роль">
                    <option>role1</option>
                    <option>role2</option>
                </select>
            </div> -->

        </div>

        <div class="auth-wrap__row">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <label class="input-checkbox" for="rec-pass">
                    <icon-gap-done class="checkbox-gap" :class="{'active' : agreement}"/>
                    <input type="checkbox" name="rec-pass" id="rec-pass" v-model="agreement">
                    <span>
                        Я соглашаюсь с 
                        <router-link :to="{name:'UserAgreement'}" style="color: var(--color-accent);">
                            условиями использования сервиса
                        </router-link>
                    </span>
                </label>
            </div>
            <div class="input-block">

                <ui-button :class="'theme-gradient'" type="submit">Зарегистрироваться</ui-button>

                <span class="color-light signin-link">
                    У вас уже есть аккаунт?
                    <RouterLink :to="'/auth/login'" style="margin-left: auto; color: var(--color-accent);">Войти</RouterLink>
                </span>
            </div>
        </div>
    </form>


</template>

<style scoped>

.signin-form.loading {
    opacity: .6;
}
.signin-link {
    text-align: center;
    margin-top: 25px;
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
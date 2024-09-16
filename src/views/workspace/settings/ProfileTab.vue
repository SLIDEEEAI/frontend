<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from "@/stores/user";
import { useNotificationStore } from "@/stores/notification";
import { changeUserPassword } from "@/api/authUser";
import router from '@/router';

const { logout, currentUser } = useUserStore()
const { showNotification } = useNotificationStore()

const email = ref<string>( currentUser.email )
const oldPassword = ref<string>('')
const newPassword = ref<string>('')

function saveNewPassword() {

    if (oldPassword.value.length && newPassword.value.length) {
        if (oldPassword.value != newPassword.value) {
            const result = changeUserPassword(oldPassword.value, newPassword.value)
            if (!result) {
                showNotification('Что-то не так! Проверьте поля')
            }
            else{
                showNotification('Пароль изменён')
                router.push({name:"login"})
            }
            console.log(result);
            return
        }
        showNotification('Старый и новый пароли совпадают')
        return
    }
    showNotification('Заполните поля')
    return
}


const logoutUser = async () => {
    logout()
    showNotification('Вы вышли из аккаунта')
}

</script>

<template>
    <div class="settings-tab profile-tab">

        <div class="settings-tab__block w-100">
            <h3>Авторизация</h3>

            <div class="user-email-block">
                <ui-input-text 
                    :container-style="{width:'calc(50% - 13px)'}"
                    style="border-radius: var(--radius-xsm); background-color: var(--color-background);" 
                    :label="'Почта'" 
                    :placeholder="'Почта'" 
                    :type="'email'" 
                    name="user-email" 
                    id="user-email"
                    v-model="email" 
                    disabled
                />
            </div>
            <!-- <span class="user-email">{{ useUserStore().currentUser.email }}</span> -->

            <div class="user-password-block">
                <ui-input-text 
                    style="border-radius: var(--radius-xsm); background-color: var(--color-background);" 
                    :label="'Cтарый пароль'" 
                    :placeholder="'Введите пароль'" 
                    :type="'password'" 
                    name="user-old-pass" 
                    id="user-old-pass"
                    v-model="oldPassword"
                />
                <ui-input-text 
                    style="border-radius: var(--radius-xsm); background-color: var(--color-background);" 
                    :label="'Новый пароль'"
                    :placeholder="'Введите пароль'" 
                    :type="'password'" 
                    name="user-new-pass" 
                    id="user-new-pass"
                    v-model="newPassword" 
                />
            </div>

            <button class="save-new-password" @click="saveNewPassword">Сохранить</button>
        </div>


        <div class="settings-tab__block w-100">
            <h3>Настройки сайта</h3>

            <div class="input-selects-row">

                <div class="input-select-block">
                    Язык интерфейса
                    <ui-input-select 
                        :options="['Русский', 'English']"
                    />
                </div>

                <div class="input-select-block">
                    Тема
                    <ui-input-select 
                        :options="['Тёмная', 'Светлая', 'Системная' ]"
                    />
                </div>

            </div>

        </div>
        
        <div class="bottom-btns">
            <button class="logout-btn" @click="logoutUser">
                <icon-exit class="exit-icon"/>
                Выйти из аккаунта
            </button>
            <button class="remove-profile-btn">Удалить мой аккаунт</button>
        </div>

    </div>
        <!-- <div class="settings-tab__block w-100">
            <h3>Настройки сайта</h3>


        </div> -->


</template>

<style scoped>
.input-selects-row{
    display: flex;
    gap: 72px;
}
.input-select-block{
    display: flex;
    align-items: center;
    gap: 24px;
    font-size: 18px;
    text-wrap: nowrap;
    color: var(--color-text-dim);
    font-weight: 600;
    line-height: 22px;
    width: 400px;
}
.profile-tab {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.user-email {
    color: var(--color-text-dim);
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 40px;
}
.user-email-block{
    display: flex;
    gap: 26px;
    margin-bottom: 24px;
}
.user-password-block {
    display: flex;
    gap: 26px;
    margin-bottom: 24px;
}

.user-password-block>div {
    width: 100%;
}

button.save-new-password {
    padding: 14px 74px;
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text-grey);
    background-color: var(--color-background);
    border-radius: var(--radius-xsm);
    margin-left: auto;
    margin-right: 0;
}

.bottom-btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.bottom-btns button {
    background: transparent;
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
}

.bottom-btns button.logout-btn {
    border-radius: var(--radius-sm);
    background: var(--color-background-soft);
    padding: 15px 24px;
    display: flex;
    align-items: center;
}

.remove-profile-btn {
    font-weight: 400;
}

.bottom-btns button:hover,
.bottom-btns button:focus {
    color: var(--color-accent-light);
    outline: 0;
}

.bottom-btns button:hover .exit-icon,
.bottom-btns button:focus .exit-icon{
    fill: var(--color-accent-light) !important;
}
</style>
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import OldHomeView from '@/views/OldHomeView.vue'
import AuthView from '@/views/AuthView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import SigninView from '@/views/auth/SigninView.vue'

import InfoView from '@/views/InfoView.vue'
import PrivacyPolicy from '@/views/information/PrivacyPolicy.vue';

import WorkspaceView from '@/views/WorkspaceView.vue'
// import ProjectsView from '@/views/workspace/ProjectsView.vue';
// import PatternsView from '@/views/workspace/PatternsView.vue';
// import SharedView from '@/views/workspace/SharedView.vue';
// import SlideeeSearchView from '@/views/workspace/SlideeeSearchView.vue';
// import SettingsView from '@/views/workspace/SettingsView.vue';

// import EditorView from '@/views/EditorView.vue'

import { useNotificationStore } from '@/stores/notification';
import { useUserStore } from '@/stores/user';
import { useDialogStore } from "@/stores/dialog";

import { refreshUserToken } from "@/api/authUser"


// дописать рефреш - не работает
async function refreshTocken() {
  const refresh : string | null = localStorage.getItem('refreshToken')
  if (refresh) {
    const responce = await refreshUserToken(refresh)
    if (responce){
      localStorage.setItem('accessToken', responce.access)
      console.log('token refreshed')
    }
    else{
      router.push({name:'login'})
      useNotificationStore().showNotification('Авторизируйтесь')
    }
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomeView,
    },
    {
      name: 'homeOld',
      path: '/home',
      component: OldHomeView,
    },
    {
      name: 'info',
      path: '/information',
      component: InfoView,
      children: [
        {
          name : 'PrivacyPolicy',
          path : 'privacy_policy',
          component: () => import('@/views/information/PrivacyPolicy.vue'),
          meta : {
            title : 'Политика конфиденциальности'
          },
          beforeEnter(){ document.documentElement.scrollTop = 0 }
        },
        {
          name : 'PersonalData',
          path : 'personal_data',
          component: () => import('@/views/information/PersonalData.vue'),
          meta : {
            title : 'Согласие на обработку персональных данных'
          },
          beforeEnter(){ document.documentElement.scrollTop = 0 }
        },
        {
          name : 'UserAgreement',
          path : 'user_agreement',
          component: () => import('@/views/information/UserAgreement.vue'),
          meta : {
            title : 'Пользовательское соглашение'
          },
          beforeEnter(){ document.documentElement.scrollTop = 0 }
        },
        {
          name : 'RefundPolicy',
          path : 'refund_policy',
          component: () => import('@/views/information/RefundPolicy.vue'),
          meta : {
            title : 'Политика возвратов'
          },
          beforeEnter(){ document.documentElement.scrollTop = 0 }
        },
      ]
    },
    {
      name: 'auth',
      path: '/auth',
      component: AuthView,
      children: [
        {
          name : 'login',
          path : 'login',
          component: LoginView,
        },
        {
          name : 'signin',
          path : 'signin',
          component: SigninView,
        }
      ]
    },
    {
      name: 'workspace',
      path: '/workspace',
      component: WorkspaceView,
      meta : {
        isNeedAuth: true,
      },
      children: [
        {
          name : 'projects',
          path : 'projects',
          component: () => import('@/views/workspace/ProjectsView.vue'),
          meta : {
            tabName : 'Мои презентации'
          }
        },
        {
          name : 'patterns',
          path : 'patterns',
          component: () => import('@/views/workspace/PatternsView.vue'),
          meta : {
            tabName : 'Шаблоны презентаций'
          }
        },
        {
          name : 'shared',
          path : 'shared',
          component: () => import('@/views/workspace/SharedView.vue'),
          meta : {
            tabName : 'Общие проекты'
          }
        },
        {
          name : 'slideeeSearch',
          path : 'slideeeSearch',
          component: () => import('@/views/workspace/SlideeeSearchView.vue'),
          meta : {
            tabName : 'Slideee Search'
          }
        },
        {
          name : 'settings',
          path : 'settings',
          component: () => import('@/views/workspace/SettingsView.vue'),
          meta : {
            tabName : 'Настройки'
          }
        }
      ],
      async beforeEnter(){
        if (localStorage.length && localStorage.getItem('refreshToken') ) {
          await refreshTocken()
        }
      }
    },
    {
      path: '/editor/:id',
      name: 'editor',
      props: { id : Number },
      // component: () => EditorView,
      component: () => import('@/views/EditorView.vue'),
      meta : {
        isNeedAuth: true,
      },
      beforeEnter(){
        console.log('переход в редактор');
        useDialogStore().hideDialog()
      }
    }
  ]
})

router.beforeEach((to)=>{
  if ( to.meta.isNeedAuth && !useUserStore().isLogged) {

    const { showNotification } = useNotificationStore();
    
    showNotification('Авторизируйтесь');

    return { path: '/auth/login', query: { redirect: to.fullPath } }

  }
  // throw new Error('');
})

export default router

import './assets/main.css'
// import "vue3-colorpicker/style.css";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import Vue3ColorPicker from "vue3-colorpicker";

import App from './App.vue'
import router from './router'

import directives from './directives';


import components from '@/components/UI';
import icons from '@/components/icons';

const pinia = createPinia();

const app = createApp(App)

// components.forEach(component => {
//     app.component(component.name, component);
// })

directives.forEach(dir => {
    app.directive(dir.name, dir)
})

for ( const ComponentName in components ){
    app.component(ComponentName, components[ComponentName]);
}

icons.forEach(icon => {
    app.component(icon.name as string, icon);
})

app.use(router)
app.use(pinia)
// app.use(Vue3ColorPicker)

app.mount('#app')

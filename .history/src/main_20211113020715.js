import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
// import VueTailwindColorPicker from 'vue-tailwind-color-picker'
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

const app = createApp(App)
// app.use(VueTailwindColorPicker)
app.use(Vue3ColorPicker)
app.mount('#app')

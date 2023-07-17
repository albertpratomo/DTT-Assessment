import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import VueRouter from '@/router';

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(VueRouter)
app.mount('#app')

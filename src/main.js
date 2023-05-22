import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useIntersectionObserver } from '@vueuse/core'
import '@/styles/common.scss'
import {getCategory} from '@/apis/testAPI'
getCategory().then(res=>{
console.log(res);
})


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

app.directive('img-lazy',{
    mounted(el,binding){
    useIntersectionObserver(el,([{isIntersecting}])=>{
        console.log(isIntersecting);
    },
    )
    }
})

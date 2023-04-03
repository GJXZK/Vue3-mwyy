import { createApp } from 'vue';
import { Icon, Swipe, SwipeItem,TextEllipsis,Popup,Progress} from 'vant';
import App from './App.vue'
import router from './router'
import store from '@/store'

createApp(App).use(router).use(store).mount('#app')
const app=createApp()
app.use(Icon).use(Swipe).use(SwipeItem).use(TextEllipsis).use(Popup).use(Progress)

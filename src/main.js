import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')

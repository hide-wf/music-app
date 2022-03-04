import { createApp } from 'vue'
import App from './App.vue';

import Vant from 'vant';
import 'vant/lib/index.css';

import router from './router/index.js';

import state from './store/index.js';
const app = createApp(App)
app.use(Vant)
app.use(state)
app.use(router).mount('#app');
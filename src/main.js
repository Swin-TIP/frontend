import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import Classes from './views/Classes.vue';
import Home from './Home.vue';
import Login from './views/Login.vue';
import Schedule from './views/Schedule.vue';
import Signup from './views/Signup.vue';
import Students from './views/Students.vue';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './assets/main.css';

// Define routes
const routes = [
    {
        path: '/', component: Home,
        children: [
            { path: '/classes', component: Classes },
            { path: '/schedule', component: Schedule },
            { path: '/students', component: Students },
        ]
    },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
    .use(vuetify)
    .use(router)
    .mount('#app');

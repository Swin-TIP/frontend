import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import Sessions from './views/Sessions.vue';
import MainLayout from './MainLayout.vue';
import Login from './views/Login.vue';
import Schedule from './views/Schedule.vue';
import Register from './views/Register.vue';
import Students from './views/Students.vue';

import './assets/main.css';

// Define routes
const routes = [
    {
        path: '/', redirect: '/schedule', component: MainLayout,
        children: [
            { path: '/sessions', component: Sessions },
            { path: '/schedule', component: Schedule },
            { path: '/students', component: Students },
        ]
    },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
    .use(router)
    .mount('#app');

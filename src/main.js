import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import Sessions from './views/Sessions.vue';
import MainLayout from './MainLayout.vue';
import Login from './views/Login.vue';
import Schedule from './views/Schedule.vue';
import Register from './views/Register.vue';
import QA from './views/Q&A.vue'
import Students from './views/Students.vue';
import Tutors from './views/Tutors.vue';
import Resources from './views/Resources.vue';
import Statistics from './views/Statistics.vue';

// Vuetify
// import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './assets/main.css';

// Define routes
const routes = [
    {
        path: '/', redirect: '/schedule', component: MainLayout,
        children: [
            { path: '/sessions', component: Sessions },
            { path: '/schedule', component: Schedule },
            { path: '/qa', component: QA },
            { path: '/students', component: Students },
            { path: '/tutors', component: Tutors },
            { path: '/resources', component: Resources },
            { path: '/tutors', component: Tutors },
            { path: '/statistics', component: Statistics }
        ]
    },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
]

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

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import Sessions from './views/Sessions.vue';
import Home from './Home.vue';
import Login from './views/Login.vue';
import Schedule from './views/Schedule.vue';
import Register from './views/Register.vue';
import QA from './views/Q&A.vue'
import Students from './views/Students.vue';

import './assets/main.css';

// Define routes
const routes = [
<<<<<<< HEAD
  {
    path: '/', component: Home,
    children: [
      { path: '/classes', component: Classes },
      { path: '/schedule', component: Schedule },
      { path: '/question', component: QA },
      { path: '/students', component: Students },
    ]
  },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup }
=======
    {
        path: '/', component: Home,
        children: [
            { path: '/sessions', component: Sessions },
            { path: '/schedule', component: Schedule },
            { path: '/students', component: Students },
        ]
    },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
>>>>>>> b5e9f33d8a93bb3f56399e4fe698db2f24efea52
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App)
  .use(router)
  .mount('#app');

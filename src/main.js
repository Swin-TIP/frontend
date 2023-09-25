import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import Classes from './views/Classes.vue';
import Home from './Home.vue';
import Login from './views/Login.vue';
import Schedule from './views/Schedule.vue';
import Signup from './views/Signup.vue';
import QA from './views/Q&A.vue'

import './assets/main.css';

// Define routes
const routes = [
  {
    path: '/', component: Home,
    children: [
      { path: '/classes', component: Classes },
      { path: '/schedule', component: Schedule },
      { path: '/question', component: QA }
    ]
  },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App)
  .use(router)
  .mount('#app');

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { User } from '@/store/user';
import BrightSparksLogo from '../assets/icons/brightsparks.svg';

const currentRoute = useRoute().fullPath;
const router = useRouter();
const userRole = User.getRole();

const handleLogout = () => {
    User.logout();
    router.push('/login');
};
</script>

<template>
    <aside class="sidenav">
        <div class="sidenav__main">
            <div class="sidenav__header">
                <img class="sidenav__logo" :src="BrightSparksLogo" alt="Bright Sparks Logo" />
                <h1 class="sidenav__title">Bright Boost</h1>
            </div>
            <nav>
                <router-link class="sidenav__link" :class="{ active: currentRoute === '/schedule' }" to="/schedule">Session
                    Schedule</router-link>
                <router-link v-if="User.getApprovedStatus() === true" class="sidenav__link"
                    :class="{ active: currentRoute === '/sessions' }" to="/sessions">Registered
                    Sessions</router-link>
                <router-link v-if="userRole === 'ADMIN'" class="sidenav__link"
                    :class="{ active: currentRoute === '/tutors' }" to="/tutors">
                    Tutors</router-link>
                <router-link v-if="userRole === 'ADMIN'" class="sidenav__link"
                    :class="{ active: currentRoute === '/students' }" to="/students">
                    Students</router-link>
                <router-link v-if="userRole === 'ADMIN'" class="sidenav__link"
                    :class="{ active: currentRoute === '/resources' }" to="/resources">
                    Resources</router-link>
                <router-link v-if="userRole === 'ADMIN'" class="sidenav__link"
                    :class="{ active: currentRoute === '/statistics' }" to="/statistics">
                    Statistics</router-link>
            </nav>
        </div>
        <router-link @click.native="handleLogout" class="sidenav__link sidenav__logout" to="/login">Logout</router-link>
    </aside>
</template>

<style scoped>
.sidenav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    width: 24%;
    background-color: #f5f5fa;
}

.sidenav__main {
    display: flex;
    flex-direction: column;
}

.sidenav__header {
    display: flex;
    justify-content: flex-start;
    padding: 1em 1.5em;
}

.sidenav__logo {
    height: 35px;
}

.sidenav__title {
    margin: 0 1em;
}

.sidenav__link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
    height: 30px;
    padding: 10px 30px;
}

.sidenav__link:hover {
    color: #4adeff;
    border-left: 4px solid #4adeff;
}

.router-link-exact-active {
    color: #4adeff;
    border-left: 4px solid #4adeff;
}
</style>

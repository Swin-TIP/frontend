<script setup>
import { useRoute, useRouter } from 'vue-router';

import BrightSparksLogo from '../assets/icons/brightsparks.svg';

const currentRoute = useRoute().fullPath;
const router = useRouter();

const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
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
                <router-link class="sidenav__link" :class="{ active: currentRoute === '/' }" to="/">Home</router-link>
                <router-link class="sidenav__link" :class="{ active: currentRoute === '/schedule' }" to="/schedule">Class
                    Schedule</router-link>
                <router-link class="sidenav__link" :class="{ active: currentRoute === '/classes' }" to="/classes">Registered
                    Classes</router-link>
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
    background-color: #F5F5FA;
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
    color: #4ADEFF;
    border-left: 4px solid #4ADEFF;
}

.router-link-exact-active {
    color: #4ADEFF;
    border-left: 4px solid #4ADEFF;
}
</style>
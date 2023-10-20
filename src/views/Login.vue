<script setup>
import { useRouter } from 'vue-router';

import { login } from '../API/auth';
import { getRegisteredSessions } from '../API/sessions';
import { User } from '../store/user';
import BrightSparksLogo from '../assets/icons/brightsparks.svg';

const router = useRouter();

let email = '';
let password = '';

const handleLogin = async () => {
    if (email === '' || password === '') {
        return;
    } else {
        const data = await login(email, password);
        if (data instanceof Error) {
            console.log("Error occurred");
        } else {
            User.create(data.role, data.accessToken);
            const registeredSessions = await getRegisteredSessions();
            const registeredSessionsIds = registeredSessions.map(session => session._id);
            User.setRegisteredSessions(registeredSessionsIds);
            router.push("/");
        }
    }
};
</script>

<template>
    <main class="main__login">
        <div class="container">
            <img class="logo" :src="BrightSparksLogo" alt="Bright Sparks Logo" />
            <h1 class="title">Sign in</h1>
            <label for="email">Email</label>
            <input v-model="email" type="text" id="email" placeholder="Email" />
            <label for="password">Password</label>
            <input v-model="password" type="password" id="password" placeholder="Password" />
            <button @click="handleLogin">Sign in</button>
            <div class="horizontal-line" />
            <p class="footer">Don't have an account? Register <router-link to="/register">here</router-link>.</p>
        </div>
    </main>
</template>

<style scoped>
.main__login {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eeeeee;
}

.container {
    display: flex;
    flex-direction: column;
    width: 15em;
    padding: 2em 2.5em;
    background-color: #FAFAFA;
}

.logo {
    height: 35px;
}

.title {
    text-align: center;
    margin-bottom: 1em;
    margin-left: 0;
}

input {
    height: 1.8em;
    padding: 0.3em 0.7em;
    margin-bottom: 1.2em;
    border: none;
    border-radius: 10px;
    background-color: #D9D9D9;
}

label {
    display: none;
}

button {
    height: 2.5em;
    width: 100%;
    margin-top: 0.5em;
    border: none;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background-color: #4ADEFF;
    cursor: pointer;
}

.horizontal-line {
    margin-top: 1em;
    height: 1px;
    width: 100%;
    background-color: rgb(208, 208, 208);
}

.footer {
    font-size: 0.6em;
    margin-bottom: 0;
}
</style>
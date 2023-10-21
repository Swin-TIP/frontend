<script setup>
import { useRouter } from 'vue-router';
import { register } from '../API/auth';
import BrightSparksLogo from '../assets/icons/brightsparks.svg';

const router = useRouter();

let name = '';
let email = '';
let password = '';
let confirmPassword = '';
let grade = 0;

const handleRegister = async () => {
    if (password !== confirmPassword) {
        console.error("Passwords dont match");
    }
    const data = await register(name, email, password, grade);

    if (data instanceof Error) {
        console.log("Error occurred");
    } else {
        localStorage.setItem("id", data._id);
        localStorage.setItem("role", data.role);
        localStorage.setItem("approved", false);
        router.push("/");
    }
};
</script>

<template>
    <main class="main__register">
        <div class="container">
            <img class="logo" :src="BrightSparksLogo" alt="Bright Sparks Logo" />
            <h1 class="title">Sign up</h1>
            <label for="name">Name</label>
            <input v-model="name" type="text" id="name" placeholder="Name" />
            <label for="email">Email</label>
            <input v-model="email" type="text" id="email" placeholder="Email" />
            <label for="password">Password</label>
            <input v-model="password" type="password" id="password" placeholder="Password" />
            <label for="confirm-password">Confirm Password</label>
            <input v-model="confirmPassword" type="password" id="confirm-password" placeholder="Confirm Password" />
            <label for="grade">Grade</label>
            <select v-model="grade" :class="{ 'select__default': grade === 0 }" id="grade">
                <option value="0">Grade Level:</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
            </select>
            <button @click="handleRegister">Register</button>
            <div class="horizontal-line" />
            <p class="footer">Already have an account? Login <router-link to="/login">here</router-link>.</p>
        </div>
    </main>
</template>

<style scoped>
.main__register {
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
    width: 300px;
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

input,
select {
    height: 1.8em;
    padding: 0.3em 0.7em;
    margin-bottom: 1.5em;
    border: none;
    border-radius: 10px;
    background-color: #D9D9D9;
}

select {
    height: 2.3em;
}

.select__default {
    color: grey;
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
<script setup>
import BrightSparksLogo from '../assets/icons/brightsparks.svg';
</script>

<template>
    <main class="main__login">
        <div class="container">
            <img class="logo" :src="BrightSparksLogo" alt="Bright Sparks Logo" />
            <h1 class="title">Sign in</h1>
            <label for="email">Email</label>
            <input type="text" id="email" placeholder="Email" />
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Password" />
            <button>Sign in</button>
            <div class="horizontal-line" />
            <p class="footer">Don't have an account? Register <router-link to="/signup">here</router-link>.</p>
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
    font-size: 1.5em;
    margin-bottom: 1em;
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
    margin-top: 0.5em;
    border: none;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background-color: #4ADEFF;
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
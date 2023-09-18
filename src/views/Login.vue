<script setup>
</script>

<template>
    <main class="main__login">
        <div class="container">
            <label for="email">Email</label>
            <input type="text" id="email" />
            <label for="password">Password</label>
            <input type="text" id="password" />
            <button>Login</button>
        </div>
    </main>
</template>

<style scoped>
.main__login {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eeeeee;
}

.container {
    display: flex;
    flex-direction: column;
    width: 15em;
}

input {
    height: 1.8em;
    padding: 0.3em 0.5em;
    margin-bottom: 1em;
    border: none;
    border-radius: 10px;
    background-color: #D9D9D9;
}

label {
    margin-bottom: 0.5em;
}

button {
    height: 2.5em;
    margin-top: 0.5em;
    border: none;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background-color: #4ADEFF;
}
</style>
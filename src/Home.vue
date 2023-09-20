<script setup>
import Sidebar from './components/Sidebar.vue';
</script>
<template>
    <div class="layout">
        <Sidebar />
        <main class="main">
            <router-view />
        </main>
    </div>
</template>

<style scoped>
.layout {
    display: flex;
}

.main {
    width: 76%;
}
</style>
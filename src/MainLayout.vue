<script setup>
import { User } from './store/user';
import Banner from './components/Banner.vue';
import Sidebar from './components/Sidebar.vue';

const isApproved = User.getApprovedStatus();
</script>
<template>
    <div class="layout" :class="{ 'banner-show': isApproved === 'false' }">
        <Sidebar />
        <Banner v-if="isApproved === 'false'" />
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

.banner-show {
    padding-top: 40px;
}
</style>
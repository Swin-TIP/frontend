<script setup>
import { formatDateString, startOfWeek, endOfWeek } from '../utils/dateOfWeek';

let dateStart = startOfWeek(new Date());
let dateEnd = endOfWeek(new Date());
let dateStartString = formatDateString(dateStart);
let dateEndString = formatDateString(dateEnd);
</script>

<template>
    <section class="container">
        <button>&lt; PREV</button>
        <span>{{ dateStartString }} - {{ dateEndString }}</span>
        <button>NEXT &gt;</button>
    </section>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    background-color: #F5F5FA;
    padding: 10px;
}
</style>
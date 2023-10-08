<script setup>
import { ref } from 'vue';
import { formatDateString, startOfWeek, endOfWeek, previousWeek, nextWeek } from '../utils/dateOfWeek';

let dateStart = startOfWeek(new Date());
let dateEnd = endOfWeek(new Date());
let dateStartString = ref(formatDateString(dateStart));
let dateEndString = ref(formatDateString(dateEnd));

const previousWeekHandler = () => {
    dateStart = previousWeek(dateStart);
    dateEnd = previousWeek(dateEnd);
    dateStartString.value = formatDateString(dateStart);
    dateEndString.value = formatDateString(dateEnd);
};
const nextWeekHandler = () => {
    dateStart = nextWeek(dateStart);
    dateEnd = nextWeek(dateEnd);
    dateStartString.value = formatDateString(dateStart);
    dateEndString.value = formatDateString(dateEnd);
};
</script>

<template>
    <section class="container">
        <button @click="previousWeekHandler">&lt; PREV</button>
        <span>{{ dateStartString }} - {{ dateEndString }}</span>
        <button @click="nextWeekHandler">NEXT &gt;</button>
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
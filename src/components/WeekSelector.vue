<script setup>
import { onMounted, ref } from 'vue';
import { formatDateString, startOfWeek, endOfWeek, previousWeek, nextWeek } from '../utils/dateOfWeek';

const emit = defineEmits(['week-selected']);

let dateStart = startOfWeek(new Date());
let dateEnd = endOfWeek(new Date());
let dateStartString = ref(formatDateString(dateStart));
let dateEndString = ref(formatDateString(dateEnd));

const previousWeekHandler = () => {
    dateStart = previousWeek(dateStart);
    dateEnd = previousWeek(dateEnd);
    emit('week-selected', dateStart);
    dateStartString.value = formatDateString(dateStart);
    dateEndString.value = formatDateString(dateEnd);
};
const nextWeekHandler = () => {
    dateStart = nextWeek(dateStart);
    dateEnd = nextWeek(dateEnd);
    emit('week-selected', dateStart);
    dateStartString.value = formatDateString(dateStart);
    dateEndString.value = formatDateString(dateEnd);
};

onMounted(() => {
    emit('week-selected', dateStart);
});
</script>

<template>
    <section class="week__container">
        <button class="selector__button" @click="previousWeekHandler">&lt; PREV</button>
        <span>{{ dateStartString }} - {{ dateEndString }}</span>
        <button class="selector__button" @click="nextWeekHandler">NEXT &gt;</button>
    </section>
</template>

<style scoped>
.week__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F5F5FA;
    padding: 10px;
}

.selector__button {
    width: 80px;
    height: 30px;
    background-color: azure;
}

.selector__button:hover {
    color: azure;
    background-color: #4ADEFF;
}
</style>
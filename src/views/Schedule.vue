<script setup>
import { ref } from 'vue';

import DaySelector from '../components/DaySelector.vue';
import SessionSchedule from '../components/SessionSchedule.vue';
import WeekSelector from '../components/WeekSelector.vue';

const daySelected = ref();
const dateSelected = ref(new Date());
const weekStartSelected = ref();

const handleDaySelected = day => {
    daySelected.value = day;
    if (weekStartSelected.value) {
        dateSelected.value = updateDateSelected(day, weekStartSelected.value);
    }
};

const handleWeekSelected = weekStart => {
    weekStartSelected.value = new Date(weekStart);
    if (daySelected.value) {
        dateSelected.value = updateDateSelected(daySelected.value, weekStart);
    }
};

const updateDateSelected = (daySelected, weekStart) => {
    let newDateSelected = new Date(weekStart);
    switch (daySelected) {
        case "Tuesday":
            newDateSelected.setDate(weekStart.getDate() + 1);
            break;
        case "Wednesday":
            newDateSelected.setDate(weekStart.getDate() + 2);
            break;
        case "Thursday":
            newDateSelected.setDate(weekStart.getDate() + 3);
            break;
        case "Friday":
            newDateSelected.setDate(weekStart.getDate() + 4);
            break;
        case "Saturday":
            newDateSelected.setDate(weekStart.getDate() + 5);
            break;
        case "Sunday":
            newDateSelected.setDate(weekStart.getDate() + 6);
            break;
        default:
            newDateSelected = new Date(weekStart);
    }
    return newDateSelected;
};
</script>

<template>
    <h1>Schedule</h1>
    <WeekSelector @week-selected="handleWeekSelected" />
    <section class="schedule__content">
        <DaySelector @day-selected="handleDaySelected" />
        <SessionSchedule :day="daySelected" :date="dateSelected" />
    </section>
</template>

<style scoped>
.schedule__content {
    margin-top: 20px;
}
</style>
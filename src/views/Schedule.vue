<script setup>
import { onMounted, ref, watch } from 'vue';

import DaySelector from '../components/DaySelector.vue';
import SessionSchedule from '../components/SessionSchedule.vue';
import WeekSelector from '../components/WeekSelector.vue';

import { getSessionsFromDates } from '../API/sessions';

const daySelected = ref();
const dateSelected = ref(new Date());
const weekStartSelected = ref();
const sessionsList = ref([]);

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

const fetchSessions = async () => {
    const diff = weekStartSelected.value.getDate() + 6;
    let weekEnd = new Date(weekStartSelected.value);
    weekEnd.setDate(diff);
    const weekStartString = weekStartSelected.value.toISOString().split("T")[0];
    const weekEndString = weekEnd.toISOString().split("T")[0];
    sessionsList.value = await getSessionsFromDates(weekStartString, weekEndString);
};

onMounted(() => {
    fetchSessions();
});

watch(weekStartSelected, () => fetchSessions());
</script>

<template>
    <h1>Schedule</h1>
    <WeekSelector @week-selected="handleWeekSelected" />
    <section class="schedule__content">
        <DaySelector @day-selected="handleDaySelected" />
        <SessionSchedule :day="daySelected" :date="dateSelected" :sessions-list="sessionsList" />
    </section>
</template>

<style scoped>
.schedule__content {
    margin-top: 20px;
    padding: 10px;
}
</style>
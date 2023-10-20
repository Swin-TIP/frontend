<script setup>
import { onMounted, ref, watch } from 'vue';

import DaySelector from '../components/DaySelector.vue';
import SessionSchedule from '../components/SessionSchedule.vue';
import WeekSelector from '../components/WeekSelector.vue';

import { getRegisteredSessions } from '../API/sessions';
import { User } from '../store/user';

const daySelected = ref();
const dateSelected = ref(new Date());
const weekStartSelected = ref();
let registeredSessions = [];
const dayRegisteredSessions = ref([]);

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

const fetchRegisteredSessions = async () => {
    registeredSessions = await getRegisteredSessions();
    registeredSessions = registeredSessions.map(session => {
        session.start_at = new Date(session.start_at);
        session.end_at = new Date(session.end_at);
        return session;
    });
};

const updateDayRegisteredSessions = () => {
    let result = [];
    result = registeredSessions.filter(session => {
        let sameDay = false;
        sameDay = session.start_at.getFullYear() === dateSelected.value.getFullYear();
        sameDay = session.start_at.getMonth() === dateSelected.value.getMonth();
        sameDay = session.start_at.getDate() === dateSelected.value.getDate();
        return sameDay;
    });
    dayRegisteredSessions.value = result;
};

const handleWithdraw = async (sessionId) => {
    User.removeRegisteredSession(sessionId);
    await fetchRegisteredSessions();
    updateDayRegisteredSessions();
};

onMounted(() => {
    fetchRegisteredSessions();
});

watch(dateSelected, () => updateDayRegisteredSessions());
</script>

<template>
    <h1>Registered Sessions</h1>
    <WeekSelector @week-selected="handleWeekSelected" />
    <section class="schedule__content">
        <DaySelector @day-selected="handleDaySelected" />
        <SessionSchedule :day="daySelected" :date="dateSelected" :sessions-list="dayRegisteredSessions"
            :registeredView="true" @on-withdraw="handleWithdraw" />
    </section>
</template>
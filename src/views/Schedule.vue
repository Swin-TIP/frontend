<script setup>
import { onMounted, ref, watch } from 'vue';

import CreateSession from '../components/CreateSession.vue';
import DaySelector from '../components/DaySelector.vue';
import SessionSchedule from '../components/SessionSchedule.vue';
import WeekSelector from '../components/WeekSelector.vue';

import { getSessionsFromDates } from '../API/sessions';
import { User } from '../store/user';

let createSession = ref(false);
const daySelected = ref();
const dateSelected = ref(new Date());
const weekStartSelected = ref();
const sessionsList = ref([]);
const registeredSessionsList = ref(User.getApprovedStatus() === true ? User.getRegisteredSessions() : []);

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

const fetchSessions = async (sessionId = null) => {
    const dateString = dateSelected.value.toISOString().split("T")[0];
    sessionsList.value = await getSessionsFromDates(dateString, dateString);
    if (sessionId) {
        User.addRegisteredSession(sessionId);
        registeredSessionsList.value = User.getRegisteredSessions();
    }
};

const handleCreate = async () => {
    console.log("Create session");
    createSession.value = true;
};

const onModalClose = () => {
    createSession.value = false;
};

onMounted(() => {
    fetchSessions();
});

watch(dateSelected, () => fetchSessions());
</script>

<template>
    <h1>Schedule</h1>
    <WeekSelector @week-selected="handleWeekSelected" />
    <section class="schedule__content">
        <div class="schedule__buttons">
            <DaySelector @day-selected="handleDaySelected" />
            <button class="schedule__button" v-if="User.getRole() === 'ADMIN'" @click="handleCreate">Create a
                Session</button>
        </div>
        <SessionSchedule :day="daySelected" :date="dateSelected" :sessions-list="sessionsList"
            :registered-sessions-ids="registeredSessionsList" :registeredView="false" @on-register="fetchSessions" />
    </section>
    <CreateSession v-if="createSession === true" @on-close="onModalClose" />
</template>

<style scoped>
.schedule__content {
    margin-top: 20px;
}

.schedule__buttons {
    display: flex;
    justify-content: space-between;
}

.schedule__button {
    font-size: 15px;
    width: 150px;
    margin-right: 10px;
}
</style>
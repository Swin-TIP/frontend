<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
    day: {
        type: String,
        default: "Monday"
    },
    date: {
        type: Date,
        default: new Date()
    },
    sessionsList: {
        type: Array,
        default: []
    }
});

let dateString = computed(() => props.date.getDate());
let monthString = computed(() => {
    let result = "";
    switch (props.date.getMonth()) {
        case 0:
            result = "January";
            break;
        case 1:
            result = "February";
            break;
        case 2:
            result = "March";
            break;
        case 3:
            result = "April";
            break;
        case 4:
            result = "May";
            break;
        case 5:
            result = "June";
            break;
        case 6:
            result = "July";
            break;
        case 7:
            result = "August";
            break;
        case 8:
            result = "September";
            break;
        case 9:
            result = "October";
            break;
        case 10:
            result = "November";
            break;
        case 11:
            result = "December";
            break;
    };
    return result;
});

const sessionTimings = computed(() => {
    const timings = [];
    props.sessionsList.forEach(session => {
        const sessionStartDateObj = new Date(session.start_at);
        const sessionEndDateObj = new Date(session.end_at);
        const sessionStartTime =
            `${sessionStartDateObj.getHours() < 10
            ? '0' + sessionStartDateObj.getHours() : sessionStartDateObj.getHours()}:${sessionStartDateObj.getMinutes() < 10 
            ? '0' + sessionStartDateObj.getMinutes() : sessionStartDateObj.getMinutes()}`;
        const sessionEndTime = 
            `${sessionEndDateObj.getHours() < 10
            ? '0' + sessionEndDateObj.getHours() : sessionEndDateObj.getHours()}:${sessionEndDateObj.getMinutes() < 10
            ? '0' + sessionEndDateObj.getMinutes() : sessionEndDateObj.getMinutes()}`;
        const sessionTiming = `${sessionStartTime} - ${sessionEndTime}`;
        timings.push(sessionTiming);
    });
    return timings;
});
</script>

<template>
    <div class="container">
        <h2 class="session__date">{{ props.day }}, {{ dateString }} {{ monthString }}</h2>
        <article v-if="sessionsList.length !== 0" v-for="(session, index) in sessionsList" class="session__item"
            :class="{ session__last: index === sessionsList.length - 1 }">
            <div class="session__details">
                <p class="session__details-big">{{ sessionTimings[index] }}</p>
                <p class="session__details-small">Students: {{ session.students.length }}/{{ session.room.capacity }}</p>
                <p class="session__details-small">Room {{ session.room.name.split("m")[1] }}</p>
            </div>
            <div class="session__attendees" v-for="tutor in session.tutors">
                <p class="session__details-big">Tutor: {{ tutor.name }}</p>
                <p class="session__details-small">
                    Expertise:
                    <span v-for="(subject, ind) in tutor.expertise">
                        {{ subject }}<span v-if="ind !== tutor.expertise.length - 1">, </span>
                    </span>
                </p>
            </div>
            <div v-if="session.tutors.length === 0" class="session__attendees">
                <p class="session__details-big">Tutor: None</p>
            </div>
            <div class="session__actions">
                <button>Enroll</button>
            </div>
        </article>
    </div>
</template>

<style scoped>
.container {
    background-color: #F0F0F0;
}

.session__date {
    padding: 10px;
    margin: 0;
}

.session__item {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #B3B3B3;
    padding: 0 10px;
}

.session__last {
    border-bottom: 1px solid #B3B3B3;
}

.session__details-big,
.session__details-small {
    margin: 0;
}

.session__details-small {
    font-size: 0.75em;
    color: #878787;
}
</style>

<script setup>
import { computed, defineProps } from 'vue';
import { useRouter } from 'vue-router';

import { User } from '../store/user';
import { registerForSession, withdrawFromSession } from '../API/sessions';
import moment from 'moment';

const emit = defineEmits(['onRegister', 'onWithdraw']);
const router = useRouter();

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
    },
    registeredSessionsIds: {
        type: Array,
        default: []
    },
    registeredView: {
        type: Boolean,
        default: false
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
        const sessionStartDateObj = moment(session.start_at);
        const sessionEndDateObj = moment(session.end_at);
        let format = "HH:mm"
        const sessionStartTime = sessionStartDateObj.format(format)
        const sessionEndTime = sessionEndDateObj.format(format)
        const sessionTiming = `${sessionStartTime} - ${sessionEndTime}`;
        timings.push(sessionTiming);
    });
    return timings;
});

const handleClick = async (action, session) => {
    console.log(action);
    switch (action) {
        case "Q&A Board":
            localStorage.setItem('selectedSession', JSON.stringify(session));
            router.push(`/qa?session_id=${session}`);
            break;
        case "register":
            await registerForSession(session._id);
            emit("onRegister", session._id);
            break;
        case "withdraw":
            await withdrawFromSession(session._id);
            emit("onWithdraw", session._id);
            break;
        case "enroll":
            await registerForSession(session._id);
            emit("onRegister", session._id);
            break;
    }
};
</script>

<template>
    <div class="session__container">
        <h2 class="session__date">{{ props.day }}, {{ dateString }} {{ monthString }}</h2>
        <article v-if="sessionsList.length !== 0" v-for="(session, index) in sessionsList" class="session__item"
            :class="{ session__last: index === sessionsList.length - 1 }">
            <div class="session__details">
                <p class="session__details-big">{{ sessionTimings[index] }}</p>
                <p class="session__details-small">Students: {{ session.students.length }}/{{ session.room.capacity }}</p>
                <p class="session__details-small">Room {{ session.room.name.split("m")[1] }}</p>
            </div>
            <div v-if="session.tutors.length !== 0" class="session__tutors">
                <div class="session__tutors-each" v-for="tutor in session.tutors">
                    <p class="session__details-big">Tutor: {{ tutor.name }}</p>
                    <p class="session__details-small">
                        Expertise:
                        <span v-for="(subject, ind) in tutor.expertise">
                            {{ subject }}<span v-if="ind !== tutor.expertise.length - 1">, </span>
                        </span>
                    </p>
                </div>
            </div>
            <div v-if="session.tutors.length === 0" class="session__tutors">
                <p class="session__details-big">Tutor: None</p>
            </div>
            <div v-if="!props.registeredView" class="session__actions">
                <!-- Not enrolled/registered -->
                <button v-if="User.getRole() === 'TUTOR' && !props.registeredSessionsIds.includes(session._id)"
                    @click="handleClick('enroll', session)">Enroll</button>
                <button v-if="User.getRole() === 'STUDENT' && !props.registeredSessionsIds.includes(session._id)"
                    @click="handleClick('register', session)">Register</button>
                <!-- Enrolled/Registered -->
                <button v-if="User.getRole() === 'TUTOR' && props.registeredSessionsIds.includes(session._id)"
                    class="session__actions-disabled" @click="handleClick('enroll', session)">Enrolled</button>
                <button v-if="User.getRole() === 'STUDENT' && props.registeredSessionsIds.includes(session._id)"
                    class="session__actions-disabled" @click="handleClick('register', session)">Registered</button>
            </div>
            <div v-if="props.registeredView" class="session__actions">
                <button @click="handleClick('Q&A Board', session)">Q&A Board</button>
                <button class="session__actions-cancel" @click="handleClick('withdraw', session)">Withdraw</button>
            </div>
        </article>
    </div>
</template>

<style scoped>
.session__container {
    background-color: #F0F0F0;
    height: 500px;
    overflow: auto;
}

.session__date {
    padding: 10px;
    margin: 0;
}

.session__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #B3B3B3;
    padding: 0 10px;
}

.session__last {
    border-bottom: 1px solid #B3B3B3;
}

.session__details {
    display: flex;
    flex-direction: column;
}

.session__tutors {
    display: flex;
    flex-direction: column;
}

.session__details-big,
.session__details-small {
    margin: 0;
}

.session__details-small {
    font-size: 0.75em;
    color: #878787;
}

.session__actions {
    display: flex;
    justify-content: space-around;
    width: 250px;
}

.session__actions-disabled {
    background-color: rgb(var(--DISABLED));
    border: 1px solid rgb(var(--DISABLED-STROKE));
    cursor: not-allowed;
    pointer-events: none;
}

.session__actions-cancel {
    background-color: rgb(var(--DANGER));
    border: 1px solid rgb(var(--DANGER-STROKE));
}
</style>

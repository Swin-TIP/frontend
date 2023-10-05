<script setup>
import { ref } from 'vue';

let day = ref("Monday");
let date = ref("2 October 2023");
let sessionSchedule = [
    {
        timeStart: "12:30",
        timeEnd: "14:30",
        subject: "Geography",
        room: "01-03",
        tutor: "Faqih",
        students: [],
        capacity: 15
    },
    {
        timeStart: "15:30",
        timeEnd: "16:30",
        subject: "Mathematics",
        room: "01-06",
        tutor: "Hehe",
        students: [],
        capacity: 15
    },
    {
        timeStart: "17:30",
        timeEnd: "18:30",
        subject: "Physics",
        room: "02-05",
        tutor: "Your mother",
        students: [],
        capacity: 15
    }
];
</script>

<template>
    <div class="container">
        <h2 class="session__date">{{ day }}, {{ date }}</h2>
        <article v-for="(session, index) in sessionSchedule" class="session__item"
            :class="{ session__last: index === sessionSchedule.length - 1 }">
            <div class="session__details">
                <p class="session__details-big">{{ session.timeStart }} - {{ session.timeEnd }}</p>
                <p class="session__details-small">{{ session.subject }}</p>
                <p class="session__details-small">Room {{ session.room }}</p>
            </div>
            <div class="session__attendees">
                <p class="session__details-big">Tutor: {{ session.tutor }}</p>
                <p class="session__details-small">Students: {{ session.students.length }}/{{ session.capacity }}</p>
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

<script setup>
import { onMounted, ref } from 'vue';

import { getAllRooms, getRoomOccupancy } from '../API/room';
import { createSession, updateSessionTutors } from '../API/sessions';
import { getTutor } from '../API/tutors';
import { getUnoccupiedRooms } from '../utils/roomOccupancyHelper';
import { toISODate } from '../utils/dateOfWeek';
import { User } from '../store/user';

const emit = defineEmits(["onClose"]);

const tutorList = ref([]);
const roomList = ref([]);
const subjectList = ref([
    'Geography',
    'Mathematics',
    'English',
    'Computer Science',
    'Literature',
    'Chemistry',
    'German',
    'Spanish'
]);
const formInput = {
    timeslot: null,
    duration: 0,
    room: "",
    subjects: [],
    tutors: []
};

const onClose = () => {
    emit("onClose", false);
};

const handleChange = async () => {
    if (formInput.timeslot !== null && formInput.duration !== 0) {
        const datetime = new Date(formInput.timeslot);
        const datetimeString = toISODate(datetime);
        const allRooms = await getRoomOccupancy(datetimeString, datetimeString);
        const unoccupiedRooms = getUnoccupiedRooms(allRooms, datetime.getTime(), formInput.duration);
        roomList.value = unoccupiedRooms;
    }
};

const onSubmit = async () => {
    const datetime = new Date(formInput.timeslot);
    const response = await createSession(datetime.getTime(), formInput.duration, formInput.room, formInput.subjects);
    if (!(response instanceof Error)) {
        const createdSessionId = response._id;
        await updateSessionTutors(createdSessionId, formInput.tutors);
    }
    emit("onClose", true);
};

onMounted(async () => {
    const token = User.getToken();
    tutorList.value = await getTutor(token);
    roomList.value = await getAllRooms();
});
</script>

<template>
    <div class="create__container">
        <div @click="onClose" class="create__outer" />
        <section class="create__content">
            <h1 class="create__title">Create a session</h1>
            <div class="create__form">
                <label for="timeslot" class="timeslot__label">Timeslot</label>
                <input type="datetime-local" id="timeslot" name="timeslot" v-model="formInput.timeslot"
                    @change="handleChange" />
                <label for="duration">Duration (minutes)</label>
                <input type="number" id="duration" name="duration" min="1" v-model="formInput.duration"
                    @change="handleChange" />
                <label for="room">Room</label>
                <select class="select__room" v-model="formInput.room" name="room" id="room">
                    <option v-for="room in roomList" :value="room._id">{{ room.name }}</option>
                </select>
                <label for="subjects">Subjects</label>
                <select class="select__subject" v-model="formInput.subjects" name="subject" id="subject" multiple>
                    <option v-for="subject in subjectList" :value="subject">{{ subject }}</option>
                </select>
                <label for="tutors">Tutors</label>
                <select class="select__tutors" v-model="formInput.tutors" name="tutors" id="tutors" multiple>
                    <option v-for="tutor in tutorList" :value="tutor._id">{{ tutor.name }}</option>
                </select>
            </div>
            <button @click="onSubmit">Submit</button>
        </section>
    </div>
</template>

<style scoped>
.create__container {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    z-index: 2;
}

.create__outer {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(128, 128, 128, 0.885);
    z-index: 2;
}

.create__content {
    background-color: #eeeeee;
    border-radius: 10px;
    width: 500px;
    padding: 10px 20px;
    z-index: 3;
}

.create__title {
    text-align: center;
    margin-bottom: 1em;
    margin-left: 0;
}

.create__form {
    display: grid;
    grid-template-columns: 200px auto;
}

input {
    height: 1.8em;
    padding: 0.3em 0.7em;
    margin-bottom: 1.2em;
    border: none;
    border-radius: 10px;
    background-color: #D9D9D9;
}

.select__room {
    height: 1.8em;
    padding: 0 8px;
    margin-bottom: 1.2em;
    border: none;
    border-radius: 10px;
    background-color: #D9D9D9;
}

.select__subject {
    height: 100px;
    padding: 0 8px;
    margin-bottom: 1.2em;
    border: none;
    border-radius: 10px;
    background-color: #D9D9D9;
}

.select__tutors {
    height: 300px;
    padding: 0 8px;
    margin-bottom: 1.2em;
    border: none;
    border-radius: 10px;
    background-color: #D9D9D9;
}

.timeslot__label {
    position: relative;
}

.create__form--date {
    position: absolute;
    top: 10px;
    left: 0;
}
</style>
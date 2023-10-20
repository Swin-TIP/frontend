<script setup>
import { onMounted, ref } from 'vue';

const emit = defineEmits(["day-selected"]);

let activeDay = ref("Monday");

const makeDayActive = (day) => {
    activeDay.value = day;
    emit('day-selected', day);
};

onMounted(() => {
    emit('day-selected', activeDay.value);
});
</script>

<template>
    <div class="day__container">
        <button @click="makeDayActive('Monday')" class="tab" :class="{ active: activeDay === 'Monday' }">
            M
        </button>
        <button @click="makeDayActive('Tuesday')" class="tab" :class="{ active: activeDay === 'Tuesday' }">
            T
        </button>
        <button @click="makeDayActive('Wednesday')" class="tab" :class="{ active: activeDay === 'Wednesday' }">
            W
        </button>
        <button @click="makeDayActive('Thursday')" class="tab" :class="{ active: activeDay === 'Thursday' }">
            T
        </button>
        <button @click="makeDayActive('Friday')" class="tab" :class="{ active: activeDay === 'Friday' }">
            F
        </button>
        <button @click="makeDayActive('Saturday')" class="tab" :class="{ active: activeDay === 'Saturday' }">
            S
        </button>
        <button @click="makeDayActive('Sunday')" class="tab" :class="{ active: activeDay === 'Sunday' }">
            S
        </button>
    </div>
</template>

<style scoped>
.day__container {
    margin-left: 30px;
    height: 40px;
}

.tab {
    height: 100%;
    width: 70px;
    border: 1px solid #B3B3B3;
    background-color: #F0F0F0;
}

.active {
    border-bottom: none;
}
</style>
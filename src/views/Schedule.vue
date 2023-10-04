<script setup>
import DaySelector from '../components/DaySelector.vue';
import SessionSchedule from '../components/SessionSchedule.vue';
import WeekSelector from '../components/WeekSelector.vue';
</script>

<template>
    <h1>Schedule</h1>
    <WeekSelector />
    <section class="schedule__content">
        <DaySelector />
        <SessionSchedule />
    </section>
</template>

<style scoped>
.schedule__content {
    margin-top: 20px;
}
</style>
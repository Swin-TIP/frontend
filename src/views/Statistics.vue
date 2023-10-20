<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { getStatistics } from '../API/statistics'
import moment from 'moment';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'
import { Line, Pie } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
)

export default {
    components: { VueDatePicker, Line, Pie },
    data() {
        return {
            start_date: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
            end_date: new Date(),
            days: null,
            students: 0,
            tutors: 0,
            sessions: 0,
            statistics: [],
            studentRoomRatio: null,
            studentTutorRatio: null,
            askedAnsweredRatio: null,
        }
    },

    mounted() {
        this.search();
    },

    methods: {
        async search() {
            let statistics = await getStatistics(this.start_date, this.end_date);
            this.days = parseInt((this.end_date - this.start_date) / (24 * 60 * 60 * 1000));
            this.students = statistics.map(s => s.student).reduce((a, b) => a + b, 0);
            this.tutors = statistics.map(s => s.tutor).reduce((a, b) => a + b, 0);
            this.sessions = statistics.length;

            let colors = [
                "#038B92",
                "#1DBBF8",
                "#89A51D",
                "#87E8F0",
                "#85E99D",
                "#0CE7BD",
                "#477627",
                "#070041",
                "#597FB1",
                "#059988",
            ]

            this.statistics = statistics.map(s => {
                let startDateTime = moment(s.session.start_at);
                let startDate = startDateTime.format('yyyy-MM-DD');
                let startTime = startDateTime.format('HH:mm');
                let endTime = startDateTime.add(s.session.duration * 60 * 1000).format('HH:mm');
                s.session.start_date = `${startDate} (${startTime})`;
                s.session.start_end_date_time = `${startDate} (${startTime} - ${endTime})`;
                s.pie = {};
                s.pie.student_vacancy = {
                    labels: ['Student', 'Vacancy'],
                    datasets: [
                        {
                            backgroundColor: ['#41B883', '#E46651'],
                            data: [s.student, s.room - s.student],
                        }
                    ]
                };
                s.pie.student_tutor = {
                    labels: ['Student', 'Tutor'],
                    datasets: [
                        {
                            backgroundColor: ['#41B883', '#E46651'],
                            data: [s.student, s.tutor],
                        }
                    ]
                };

                let uniqueTutors = [
                    ...new Set(s.tutor_qna.map(t => t.tutor._id))
                ].map(tid => {
                    let tutors = s.tutor_qna.filter(t => t.tutor._id == tid);
                    console.log(tutors)
                    let answered = tutors.map(t => t.answered).reduce((a, b) => a + b, 0);
                    return {
                        tutor: tutors[0].tutor,
                        answered: answered,
                    }
                });

                s.pie.asked_answered = {
                    labels: ['Unanswered', ...uniqueTutors.map(t => t.tutor.name)],
                    datasets: [
                        {
                            backgroundColor: ['#E46651', ...colors],
                            data: [
                                s.asked - s.answered,
                                ...uniqueTutors.map(t => t.answered)
                            ],
                        }
                    ]
                };
                return s;
            });

            this.studentRoomRatio = {
                labels: [...statistics.map(s => s.session.start_date)],
                datasets: [{
                    label: 'Students / Room Capacity',
                    backgroundColor: '#0000FF',
                    data: [...statistics.map(s => s.student_room_ratio)]
                }]
            }

            this.studentTutorRatio = {
                labels: [...statistics.map(s => s.session.start_date)],
                datasets: [{
                    label: 'Students / Tutors',
                    backgroundColor: '#00FF00',
                    data: [...statistics.map(s => s.student_tutor_ratio)]
                }]
            }

            this.askedAnsweredRatio = {
                labels: [...statistics.map(s => s.session.start_date)],
                datasets: [{
                    label: 'Answered Questions / Asked Questions',
                    backgroundColor: '#FF0000',
                    data: [...statistics.map(s => s.asked_answer_ratio)]
                }]
            }

            console.log(statistics)
        }
    }
}
</script>

<template>
    <v-row>
        <v-col>
            Start Date:
            <VueDatePicker v-model="start_date" :enable-time-picker="false" />
        </v-col>
        <v-col>
            End Date:
            <VueDatePicker v-model="end_date" :enable-time-picker="false" />
        </v-col>
        <v-col>
            <button @click="search">Search</button>
        </v-col>
    </v-row>

    <h1>Showing {{ days }} days statistics ({{ sessions }} Sessions, {{ tutors }} Tutors, {{ students }} Students)</h1>

    <v-row no-gutters>
        <v-col>
            <Line v-if="studentRoomRatio != null" :data="studentRoomRatio" />
        </v-col>
        <v-col>
            <Line v-if="studentTutorRatio != null" :data="studentTutorRatio" />
        </v-col>
        <v-col>
            <Line v-if="askedAnsweredRatio != null" :data="askedAnsweredRatio" />
        </v-col>
    </v-row>

    <v-expansion-panels multiple>

        <v-expansion-panel v-for="stat in statistics">

            <v-expansion-panel-title expand-icon="mdi-menu-down">
                {{ stat.session.start_end_date_time }} (Click to toggle expansion)
            </v-expansion-panel-title>

            <v-expansion-panel-text>
                <v-row no-gutters>
                    <v-col>
                        Occupancy rate: {{ (stat.student_room_ratio * 100).toFixed(0) }}%
                        <Pie :data="stat.pie.student_vacancy" />
                    </v-col>

                    <v-col>
                        Tutor-students ratio: {{ stat.student_tutor_ratio }}
                        <Pie :data="stat.pie.student_tutor" />
                    </v-col>

                    <v-col>
                        Answered question rate: {{ (stat.asked_answer_ratio * 100).toFixed(0) }}%
                        <Pie :data="stat.pie.asked_answered" />
                    </v-col>

                    <v-col />
                    <v-col />
                    <v-col />
                </v-row>
            </v-expansion-panel-text>

        </v-expansion-panel>

    </v-expansion-panels>
</template>
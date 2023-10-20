<template>
    <div>
        <div class="menu__container">
            <!-- Search bar -->
            <div class="operate">
                <button class="create-button" @click="openDialog">Create</button>
            </div>
        </div>
        <table v-if="roomList.length" class="table__tutors">
            <thead>
                <tr>
                    <th class="table__header">Room</th>
                    <th class="table__header">Capacity</th>
                    <th class="table__header">Created At</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(room, index) in roomList">

                    <td>{{ room.name }}</td>
                    <td>{{ room.capacity }}</td>
                    <td>{{ room.created_at }}</td>
                </tr>
            </tbody>
        </table>
    </div>


    <div class="dialog-container" v-if="dialog">
        <div class="dialog" style="max-width: 500px;">
            <div class="dialog-header">
                <span class="headline">Input Tutor Info</span>
            </div>
            <div class="dialog-content">
                <!-- User Info Form -->
                <form>
                    <input class="input-field" placeholder="Name" v-model="room_name">
                    <input class="input-field" placeholder="Capacity" v-model="room_capacity">
                </form>
            </div>
            <div class="dialog-actions">
                <button @click="createRoom" class="create-button">Create</button>
                <button @click="closeDialog" class="close-button">Close</button>
            </div>
        </div>
    </div>
</template>
  
  <!-- Javascript -->
<script>

import { getAllRooms, createNewRoom } from '../API/room';
import moment from 'moment';

export default {
    // TODO: Fetch data from the backend
    data() {
        return {
            roomList: [],
            dialog: false,
            room_name: null,
            room_capacity: null,
        }
    },
    mounted() {
        this.refreshRoomList();
    },
    methods: {
        refreshRoomList() {
            getAllRooms()
                .then(data => {
                    this.roomList = data.map(d => {
                        return {
                            ...d,
                            created_at: moment(d.created_at).format('YYYY-MM-DD HH:mm'),
                        }
                    });
                });
        },
        createRoom() {
            this.closeDialog();
            createNewRoom(this.room_name, this.room_capacity)
                .then(() => {
                    this.refreshRoomList();
                });
        },
        openDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
        },
    },
}
</script>
  
  <!-- CSS -->
<style scoped>
@import url(../assets/main.css);

.menu__container {
    gap: 10px;
    display: flex;
    justify-content: flex-start;
    margin-left: 15px;
    margin-top: 10px;
    margin-bottom: 20px;
    align-items: center;
}

.menu__container .search-bar {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

.menu__container .create-button,
.menu__container .approve-button {
    background-color: aqua;
    color: black;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 10px;
    transition: background-color 0.3s;
}

.menu__container .create-button:hover,
.menu__container .approve-button:hover {
    background-color: #005691;
}

.table__header {
    font-weight: bold;
}

.table__tutors {
    border: 1px solid #ccc;
    font-size: 14px;
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    margin-left: 15px;
}

.table__tutors td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.table__tutors th,
.table__tutors td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
    box-sizing: border-box;
}

.selectAll {
    min-width: 30px;
    max-width: 30px;
}

.table__header {
    min-width: 217px;
    max-width: 217px;
}

.table__header:nth-child(3) {
    /* Expertise column */
    min-width: 258px;
    max-width: 258px;
}

.table__header:nth-child(4) {
    /* Email column */
    min-width: 272px;
    max-width: 272px;
}

.pagination-container {
    position: fixed;
    bottom: 30%;
    left: 60%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
}

.pagination-container button {
    background-color: #eee;
    padding: 8px;
    margin: 0 5px;
    border: 1px solid #ddd;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

.pagination-container button.active {
    background-color: var(--PRIMARY-COLOR);
}

.dialog-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.dialog {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    max-width: 500px;
}

.dialog-header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.dialog-content {
    margin-bottom: 20px;
}

.dialog-content .input-field {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

.dialog-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.dialog-actions .create-button,
.dialog-actions .close-button {
    background-color: aqua;
    color: black;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 10px;
    transition: background-color 0.3s;
}

.dialog-actions .create-button:hover,
.dialog-actions .close-button:hover {
    background-color: #005691;
}
</style>
  
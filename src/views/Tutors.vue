<template>
  <div>
    <div class="menu__container">
      <!-- Search bar -->
      <input class="search-bar" type="text" placeholder="Search by name" v-model="searchKeyword">
      <div class="operate">
        <button class="approve-button" @click="approveTutors">Approve</button>
        <button class="create-button" @click="openDialog">Create</button>
      </div>
    </div>
    <table v-if="users.length" class="table__tutors">
      <thead>
        <tr>
          <th class="table__header">ID</th>
          <th class="table__header">Name</th>
          <th class="table__header">Expertise</th>
          <th class="table__header">Email</th>
        </tr>
      </thead>
      <tbody>
        <!-- <tr v-for="user in paginatedUsers" :key="user.id">
          <td>
            <input type="checkbox" v-model="selectedUsers" :value="user.id">
          </td>
          <td>{{ user._id }}</td>
          <td>{{ user.name }}</td>
          <td>
            <span v-for="(expertise, index) in user.expertise" :key="index">
              {{ expertise }}
              <span v-if="index < user.expertise.length - 1">, </span>
            </span>
          </td>
          <td>{{ user.email }}</td>
        </tr> -->
        <tr v-for="(user, index) in paginatedUsers">
          <td>
            <input type="checkbox" v-model="selectedUsers" :value="paginatedUsers[index]._id">
          </td>
          <td>{{ paginatedUsers[index]._id }}</td>
          <td>{{ paginatedUsers[index].name }}</td>
          <td>
            <span v-for="(expertise, index) in user.expertise" :key="index">
              {{ expertise }}
              <span v-if="index < user.expertise.length - 1">, </span>
            </span>
          </td>
          <td>{{ paginatedUsers[index].email }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-container">
      <button v-for="page in Math.ceil(users.length / itemsPerPage)" :key="page" @click="changePage(page)"
        :class="{ active: page === currentPage }">
        {{ page }}
      </button>
    </div>
  </div>

  <div class="dialog-container" v-if="dialog">
    <div class="dialog" style="max-width: 500px;">
      <div class="dialog-header">
        <span class="headline">Input Tutor Info</span>
      </div>
      <div class="dialog-content">
        <!-- User Info Form -->
        <form>
          <input class="input-field" placeholder="Name" v-model="name">
          <input class="input-field" placeholder="Email" v-model="email">
          <input class="input-field" placeholder="Password" v-model="password" type="password">
          <input class="input-field" placeholder="Expertise" v-model="expertiseInput">
        </form>
      </div>
      <div class="dialog-actions">
        <button @click="createTutors" class="create-button">Create</button>
        <button @click="closeDialog" class="close-button">Close</button>
      </div>
    </div>
  </div>
</template>

<!-- Javascript -->
<script>
import { User } from "../store/user";
import { getTutor } from '../API/tutors';
import { createTutor } from '../API/tutors';
import { approveTutor } from '../API/tutors';

export default {
  // TODO: Fetch data from the backend
  data() {
    return {
      dialog: false,
      users: [],
      selectedUsers: [],
      name: '',
      email: '',
      password: '',
      expertiseInput: '',
      expertise: [],
      currentPage: 1,
      itemsPerPage: 10,
      searchKeyword: ''
    }
  },
  mounted() {
    this.getTutorList()
  },
  watch: {
    selectedUsers(newVal) {
      this.selectAll = newVal.length === this.users.length
    }
  },
  methods: {
    async createTutors() {
      try {
        const expertiseArray = this.expertiseInput.split(',');
        this.expertise = this.expertise.concat(expertiseArray);

        // Create tutor via API
        await createTutor(this.name, this.email, this.password, this.expertise);

        // Close the dialog, Clean input and array
        this.expertiseInput = '';
        this.expertise = [];
        this.dialog = false;

        // Refresh the tutor list
        await this.getTutorList();
      } catch (error) {
        console.error('Error creating tutor:', error);
      }
    },
    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedUsers = this.paginatedUsers.map(user => user.id);
      } else {
        this.selectedUsers = [];
      }
    },
    async getTutorList() {
      try {
        const token = User.getToken();
        const data = await getTutor(token);
        this.users = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async approveTutors() {
      const token = User.getToken()

      for (const user of this.selectedUsers) {
        try {
          const response = await approveTutor(token, user.approve, user);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    },
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
  computed: {
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredUsers.slice(startIndex, endIndex);
    },

    filteredUsers() {
      const keyword = this.searchKeyword.toLowerCase();
      return this.users.filter(user =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.expertise.some(exp => exp.toLowerCase().includes(keyword))
      );
    },
  }
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
  width: 213px;
  box-sizing: border-box;
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

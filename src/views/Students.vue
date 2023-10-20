<template>
  <div>
    <div class="menu__container">
      <!-- Search bar -->
      <input class="search-bar" type="text" placeholder="Search by name" v-model="searchKeyword">
      <div class="operate">
        <button class="approve-button" @click="approveStudents">Approve</button>
        <button class="dis-button" @click="disapproveStudents">Disapprove</button>
      </div>
    </div>

    <paginate :page-count="Math.ceil(filteredUsers.length / itemsPerPage)" :click-handler="changePage" :prev-text="'Prev'"
      :next-text="'Next'" />
    <table v-if="users.length" class="table__tutors">
      <thead>
        <tr>
          <th class="selectAll"><input type="checkbox" v-model="allSelected" @change="toggleSelectAll"></th>
          <th class="table__header">ID</th>
          <th class="name">Name</th>
          <th class="approve">Approve</th>
          <th class="table__header">Grade</th>
          <th class="table__header">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in paginatedUsers">
          <td>
            <input type="checkbox" v-model="selectedUsers" :value="paginatedUsers[index]._id" :checked="allSelected">
          </td>
          <td>{{ paginatedUsers[index]._id }}</td>
          <td>{{ paginatedUsers[index].name }}</td>
          <td><button
              :class="{ 'appStatus': true, 'aqua': paginatedUsers[index].approved, 'red': !paginatedUsers[index].approved }">{{
                paginatedUsers[index].approved ? 'Approved' : 'On boarding' }}</button></td>
          <td>
            {{ user.grade }}
          </td>
          <td>{{ paginatedUsers[index].email }}</td>
        </tr>
      </tbody>
    </table>


  </div>
</template>

<!-- Javascript -->
<script>
import { User } from "../store/user";
import { getStudent, approveStudent, disapproveStudent } from '../API/students';
import Paginate from "vuejs-paginate-next";

export default {
  // TODO: Fetch data from the backend
  components: {
    paginate: Paginate,
  },
  data() {
    return {
      dialog: false,
      users: [],
      selectedUsers: [],
      allSelected: false,
      name: '',
      email: '',
      password: '',
      expertiseInput: '',
      expertise: [],
      currentPage: 1,
      savedPage: 0,
      itemsPerPage: 10,
      searchKeyword: ''
    }
  },
  mounted() {
    this.getStudentList()
  },
  watch: {
    selectedUsers(newVal) {
      this.selectAll = newVal.length === this.users.length
    }
  },
  methods: {
    toggleSelectAll() {
      if (this.allSelected) {
        this.selectedUsers = this.paginatedUsers.map(user => user._id);
      } else {
        this.selectedUsers = [];
      }
    },
    async getStudentList() {
      try {
        const token = User.getToken();
        const data = await getStudent(token);
        this.users = data;
        console.log(this.paginatedUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async approveStudents() {
      const token = User.getToken()

      this.savedPage = this.currentPage

      for (const user of this.selectedUsers) {
        try {
          const response = await approveStudent(token, user.approve, user);
          // window.alert('Tutor approved successfully!');
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }

      await this.getStudentList()

      //After approve or disapprove, clear selection.
      this.selectedUsers = []

      this.currentPage = this.savedPage
    },
    async disapproveStudents() {
      const token = User.getToken()

      this.savedPage = this.currentPage

      for (const user of this.selectedUsers) {
        try {
          const response = await disapproveStudent(token, user.approve, user);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }

      await this.getStudentList()

      //After approve or disapprove, clear selection.
      this.selectedUsers = []

      this.currentPage = this.savedPage
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

      this.currentPage = 1

      const filtered = this.users.filter(user =>
        user.name.toLowerCase().includes(keyword)
      );

      console.log(filtered);

      return filtered;
    }
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

.dis-button {
  background-color: red;
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
.menu__container .approve-button:hover,
.menu__container .dis-button:hover {
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

.approve {
  min-width: 106px;
  max-width: 106px;
}

.name {
  min-width: 150px;
  max-width: 150px;
}

.table__header {
  min-width: 225px;
  max-width: 225px;
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

.appStatus {
  max-height: 20px;
}

.appStatus.aqua {
  background-color: aqua;
}

.appStatus.red {
  background-color: red;
}

.pagination-container {
  position: relative;
  margin-top: 30px;
  left: 50%;
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
  background-color: aqua;
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

<style lang="css">
/* Adopt bootstrap pagination stylesheet. */
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

/* Write your own CSS for pagination */
.pagination {}

.page-item {}
</style>
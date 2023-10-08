<template>
  <v-container>
    <div class="menu__container">
      <!--Search bar-->
      <v-text-field
        density="compact"
        placeholder="Search by name"
        variant="solo"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
      ></v-text-field>

      <v-btn size="small" color="error" @click="deleteSelected">Delete</v-btn>
      <v-btn size="small" color="primary" @click="approveSelected">Approve</v-btn>
    </div>
    <v-table v-if="users.length" class="table__students" density="compact">
      <thead>
        <tr>
          <th><input type="checkbox" v-model="selectAll" @change="toggleSelectAll" /></th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Approved</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td><input type="checkbox" v-model="selectedUsers" :value="user.id" /></td>
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <v-chip density="compact" :color="user.approved ? 'green' : 'red'">{{
              user.approved
            }}</v-chip>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination :length="5"></v-pagination>
  </v-container>
</template>

<!-- Javascript -->
<script>
export default {
  // TODO: Fetch data from the backend
  data() {
    return {
      // Dummy users. They are hardcoded for now. later we will fetch them from the backend
      users: [
        { id: '1', name: 'Joe Doe-1', email: 'joe-doe1@gmail.com', approved: true },
        { id: '2', name: 'Joe Doe-2', email: 'joe-doe2@gmail.com', approved: true },
        { id: '3', name: 'Joe Doe-3', email: 'joe-doe3@gmail.com', approved: true },
        { id: '4', name: 'Joe Doe-4', email: 'joe-doe4@gmail.com', approved: true },
        { id: '5', name: 'Joe Doe-5', email: 'joe-doe5@gmail.com', approved: true },
        { id: '6', name: 'Joe Doe-6', email: 'joe-doe6@gmail.com', approved: false },
        { id: '7', name: 'Joe Doe-7', email: 'joe-doe7@gmail.com', approved: false },
        { id: '8', name: 'Joe Doe-8', email: 'joe-doe8@gmail.com', approved: false },
        { id: '9', name: 'Joe Doe-9', email: 'joe-doe9@gmail.com', approved: false },
        { id: '10', name: 'Joe Doe-10', email: 'joe-doe10@gmail.com', approved: false }
      ],
      selectedUsers: [], // store selected users
      selectAll: false // Flag to indicate select all status
    }
  },
  methods: {
    // TODO: Call backend API
    deleteSelected() {
      this.users = this.users.filter((user) => !this.selectedUsers.includes(user.id))
      this.selectedUsers = []
    },
    // TODO: Call backend API
    approveSelected() {
      this.users = this.users.map((user) => {
        if (this.selectedUsers.includes(user.id)) {
          user.approved = true
        }
        return user
      })
      this.selectedUsers = []
    },
    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedUsers = this.users.map((user) => user.id)
      } else {
        this.selectedUsers = []
      }
    }
  },
  watch: {
    selectedUsers(newVal) {
      this.selectAll = newVal.length === this.users.length
    }
  }
}
</script>

<!-- CSS -->
<style scoped>
.menu__container {
  gap: 10px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  align-items: center;
}

.table__students {
  border: 1px solid #ccc;
  font-size: 14px;
}
</style>

<template>
  <!-- Display user table only after the data is fetched from the server -->
  <v-container v-if="state.students.length">
    <div class="menu__container">
      <!--Search bar-->
      <div class="input__username">
        <v-text-field
          density="compact"
          placeholder="Search by name or email"
          variant="solo"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          v-model="searchQuery"
        ></v-text-field>
        <v-btn size="small" color="info" @click="searchStudentsByName">Search</v-btn>
      </div>
      <div class="button__div">
        <v-btn size="small" color="error" @click="deleteSelected">UnApprove</v-btn>
        <v-btn size="small" color="primary" @click="approveSelected">Approve</v-btn>
      </div>
    </div>

    <!-- Show loading when the user data is being fetched from the server  -->
    <v-container v-if="state.loading">
      <v-banner-text color="primary">Loading...</v-banner-text>
      <v-progress-linear indeterminate color="primary"> </v-progress-linear>
    </v-container>

    <!-- Show error message when the user data is not fetched from the server  -->
    <v-container v-if="state.error">
      <v-banner-text color="error">Error: {{ state.error }}</v-banner-text>
    </v-container>

    <v-table v-if="state.students.length" class="table__students" density="compact">
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
        <tr v-for="user in state.students" :key="user.id">
          <td><input type="checkbox" v-model="selectedUsers" :value="user._id" /></td>
          <td>{{ user._id }}</td>
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
  </v-container>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useStudentsStore } from '@/store/students'

export default {
  setup() {
    const { state, getStudentsList, fetchStudentByName, setStudentApproval } = useStudentsStore()

    onMounted(() => {
      getStudentsList()
    })

    const selectedUsers = ref([])
    const selectAll = ref(false)
    const searchQuery = ref('') // Add a reference for the search query

    const searchStudentsByName = () => {
      fetchStudentByName(searchQuery.value)
    }

    const deleteSelected = async () => {
      for (let userId of selectedUsers.value) {
        await setStudentApproval(userId, false)
      }
      selectedUsers.value = []
    }

    const approveSelected = async () => {
      for (let userId of selectedUsers.value) {
        await setStudentApproval(userId, true)
      }
      selectedUsers.value = []
    }

    const toggleSelectAll = () => {
      if (selectAll.value) {
        selectedUsers.value = state.students.map((user) => user._id)
      } else {
        selectedUsers.value = []
      }
    }

    return {
      state,
      selectedUsers,
      selectAll,
      deleteSelected,
      approveSelected,
      toggleSelectAll,
      searchQuery,
      searchStudentsByName
    }
  },

  watch: {
    selectedUsers(newVal) {
      this.selectAll = newVal.length === this.state.students.length
    }
  }
}
</script>

<style scoped>
.menu__container {
  gap: 10px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  align-items: center;
}

.input__username {
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  border-right: 2px solid #ccc;
  padding-right: 10px;
}

.button__div {
  display: flex;
  gap: 10px;
}

.table__students {
  border: 1px solid #ccc;
  font-size: 14px;
}

.table__students tbody tr:nth-child(odd) {
  background-color: #f5f5fa;
}

.table__students tbody tr:nth-child(even) {
  background-color: #fff;
}
</style>

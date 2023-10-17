
<template>
  Registered Sessions
  <div class="sessionContainer" v-for="(session, index) in sessionArr">
    <span>{{ sessionArr[index].subjects }}</span>
    <span>{{ sessionArr[index].start_at }}</span>
    <span>{{ sessionArr[index].end_at }}</span>
    <button @click="goToQAPage(index)">Q&A</button>
  </div>
</template>

<script>
import axios from 'axios';
import { User } from '../store/user';
export default {
  data() {
    return {
      sessionArr: []
    }
  },
  mounted() {
    localStorage.removeItem('selectedSession');
    this.getSession()
  },
  methods: {
    async getSession() {
      const token = User.getToken()

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }

      try {
        const response = await axios.get(`https://swinburne-398109.ts.r.appspot.com/api/user/session/list`, { headers })
        this.sessionArr = response.data
        console.log(this.sessionArr);
        return response.data
      } catch (error) {
        throw error
      }
    },
    goToQAPage(index) {
      const selectedSession = this.sessionArr[index];
      localStorage.setItem('selectedSession', JSON.stringify(selectedSession));

      // 假设你的Q&A页面路径为 '/qa'
      this.$router.push('/qa');
    }
  }
}


</script>
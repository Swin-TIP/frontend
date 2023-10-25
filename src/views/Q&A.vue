<template>
  <div id="header">
    <h1>Q&A board</h1>
  </div>

  <div id="title">
    <h1>{{ subjects }}</h1>

    <div id="date">
      {{ startAt }} ~ {{ endAt }}
    </div>
  </div>

  <div id="questionContainer">
    <div v-for="(question, index) in questionArr" class="question">
      <span class="qDetail">{{ questionArr[index].question }}</span>
      <span class="asker">Asked by: {{ questionArr[index].raised_by.name }}</span>
      <div class="buttons" v-if="role === 'TUTOR'">
        <div class="answeredBy" v-if="questionArr[index].is_answered === true">Answered by: {{
          questionArr[index].answered_by.name }}</div>
        <div class="voteDetail">{{ questionArr[index].votes.length }} Votes</div>
        <div id="answering"
          :class="{ answering: !questionArr[index].is_answered, answered: questionArr[index].is_answered }">{{
            questionArr[index].is_answered ? 'Answered' : 'Answering' }}</div>
        <button id="mark" v-on:click="markAsAnswered(index)">{{ !questionArr[index].is_answered ? 'Mark as answered' :
          'Remove answer' }}</button>
      </div>
      <div class="buttons" v-if="role === 'STUDENT'">
        <div class="answeredBy" v-if="questionArr[index].is_answered === true">Answered by: {{
          questionArr[index].answered_by.name }}</div>
        <div class="voteDetail">{{ questionArr[index].votes.length }} Votes</div>
        <button class="vote" @click="voteForQuestion(index)">&uarr;</button>
      </div>
    </div>

    <div id="postQuestion" v-if="role === 'STUDENT'">
      <div id="questionInput">
        <input v-model="qInput" type="text" name="qInput" id="qInput">
      </div>
      <button id="post" v-on:click="postQuestion">Post</button>
    </div>
  </div>
</template>

<script>
import { postRequest } from "../API/QA";
import { getRequest, getSessionDetail } from "../API/QA";
import { patchStatus } from "../API/QA";
import { patchVote } from "../API/QA";
import { User } from "../store/user";
import moment from 'moment';

export default {
  data() {
    return {
      sessionId: '',
      startAt: '',
      endAt: '',
      subjects: "",
      qInput: '',
      newQuestion: '',
      questionArr: [],
      role: User.getRole()
    }
  },

  mounted() {
    //Get question list from API
    this.getQuestion()
  },

  methods: {
    beAnswered() {
      this.qStatus = 'Answered'
    },

    postQuestion() {
      if (this.qInput !== '') {
        const token = User.getToken()

        let sessionID = this.$route.query.session_id

        postRequest(this.qInput, token, sessionID)
          .then(response => {
            console.log(response.data);
            this.getQuestion()
          })
          .catch(error => {
            console.error(error);
          })
        this.qInput = ''
      }
    },

    getQuestion() {
      let sessionID = this.$route.query.session_id;

      const token = User.getToken()

      if (this.startAt == "") {
        getSessionDetail(token, sessionID)
          .then(data => {
            console.log(data)

            let df = "DD/MM/yyyy HH:mm"
            let startDate = moment.unix(data.start_at / 1000).format(df);
            let endDate = moment.unix(data.end_at / 1000).format(df);

            this.startAt = startDate;
            this.endAt = endDate;
            this.subjects = data.subjects.join(", ");
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          })
      }

      getRequest(token, sessionID)
        .then(data => {
          this.questionArr = data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
    },

    markAsAnswered(index) {
      const token = User.getToken()

      let mark = !this.questionArr[index].is_answered

      let qID = this.questionArr[index]._id

      patchStatus(mark, token, qID)
        .then(() => {
          // When marked successfully, refresh the question list
          return this.getQuestion();
        })
        .catch(error => {
          console.error('Error marking as answered:', error);
        })
    },
    voteForQuestion(index) {
      const token = User.getToken()
      let qID = this.questionArr[index]._id

      patchVote(token, qID)
        .then(() => {
          // When marked successfully, refresh the question list
          return this.getQuestion();
        })
        .catch(error => {
          console.error('Error voting:', error);
        })
    }
  }
}
</script>

<style scoped>
@import url(../assets/main.css);

/* #header {
  margin-left: 20px;
  font-size: 30px;
  font-weight: bolder;
} */

/* #title {
  margin-top: 40px;
  margin-left: 30px;
  top: 100px;
} */

#subject {
  display: inline-block;
}

#date {
  /* margin-top: 40px; */
  margin-left: 30px;
  top: 100px;
  font-size: 19px;
  color: #707070;
}

#questionContainer {
  position: relative;
  overflow: auto;
  height: 588px;
  width: 995px;
  margin-top: 20px;
  margin-left: 30px;
  margin-bottom: 10px;
  background-color: #d9d9d9;
  border-radius: 25px;
}

.question {
  /* background-color: black; */
  display: flex;
  position: relative;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  height: 111px;
  border-bottom: 1px solid black;
}

.question:first-child {
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
}

.qDetail {
  margin-top: 30px;
  margin-left: 30px;
  font-size: 17px;
}

.asker {
  margin-left: 30px;
  font-size: 15px;
  color: gray;
}

.buttons {
  position: absolute;
  top: 40%;
  right: 0;
  display: flex;
  box-sizing: border-box;
  margin-bottom: 20px;
  margin-right: 50px;
  gap: 30px;
  justify-content: flex-end;
  /* border-radius: 15px; */
}

#mark {
  width: 150px;
  height: 30px;
  border-radius: 15px;
  border: none;
}

#answering {
  position: relative;
  right: -15px;
  width: 90px;
  max-height: 30px;
  color: rgb(var(--DANGER));
  background-color: aqua;
  border-radius: 10px;
  text-align: center;
}

.answeredBy {
  position: relative;
  top: -10px;
  right: -40px;
  max-width: 135px;
  text-align: center;
  background-color: #4ADEFF;
  border-radius: 10px;
}

.vote {
  position: relative;
  top: -5px;
  right: -10px;
}

.voteDetail {
  position: relative;
  right: -25px;
}

#mark:hover {
  background: aqua;
}

#postQuestion {
  position: sticky;
  bottom: 10px;
  width: 80%;
  height: 52px;
  margin-left: 10%;
  display: flex;
  border-radius: 20px;
  background-color: white;
}

#qInput {
  border: none;
  margin-top: 2px;
  width: 600px;
  height: 90%;
  margin-left: 20px;
}

#post {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 119px;
  height: 32px;
  border-radius: 15px;
  border: none;
}

#post:hover {
  background-color: aqua;
}
</style>
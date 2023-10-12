<template>
  <div id="header">
    <h1>Q&A board</h1>
  </div>

  <div id="title">
    <h1 id="subject">
      Mathmatics
    </h1>
    <div id="date">
      123456
    </div>
  </div>

  <div id="questionContainer">
    <div v-for="(question, index) in questionArr" class="question">
      <span class="qDetail">{{ questionArr[index].question }}</span>
      <span class="asker">Asked by: {{ `${questionArr[index].raised_by.name}` }}</span>
      <div class="buttons" v-if="role === 'TUTOR'">
        <button id="answering"
          :class="{ answering: !questionArr[index].is_answered, answered: questionArr[index].is_answered }">{{
            questionArr[index].is_answered ? 'Answered' : 'Answering' }}</button>
        <button id="mark" v-on:click="markAsAnswered(index)">Mark as answerd</button>
      </div>
      <div class="buttons" v-if="role === 'STUDENT'">
        <button class="vote">&uarr;</button>
        <button class="downgrade">&darr;</button>
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
import { getRequest } from "../API/QA";
import { patchStatus } from "../API/QA";
import { User } from "../store/user";

export default {
  data() {
    return {
      qInput: '',
      newQuestion: '',
      questionArr: [],
      role: User.getRole()
    }
  },

  mounted() {
    this.getQuestion()
  },

  methods: {
    beAnswered() {
      this.qStatus = 'Answered'
    },

    postQuestion() {
      if (this.qInput !== '') {
        const token = User.getToken()

        postRequest(this.qInput, token)
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
      const token = User.getToken()

      getRequest(token)
        .then(data => {
          this.questionArr = data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
    },

    markAsAnswered(index) {
      const token = User.getToken()

      const mark = 'true'

      let qID = this.questionArr[index]._id
      patchStatus(mark, token, qID)
      getRequest(token)
        .then(data => {
          this.questionArr = data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
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

/* #subject {
  font-size: 35px;
} */

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

#answering,
#mark {
  width: 150px;
  height: 30px;
  border-radius: 15px;
  border: none;
}

#answering {
  color: rgb(var(--DANGER));
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
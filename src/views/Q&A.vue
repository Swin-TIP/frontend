<template>
  <div id="header">
    Q&A board
  </div>

  <div id="title">
    <div id="subject">
      Mathmatics
    </div>
    <div id="date">
      123456
    </div>
  </div>

  <div id="questionContainer">
    <div v-for="(question, index) in questionArr" class="question">
      <span class="qDetail">{{ question }}</span>
      <span class="asker">Asked by: Andy</span>
      <div class="buttons" v-if="userGroup === 'tutor'">
        <button class="answering">{{ questionStatus[index] }}</button>
        <button class="mark" v-on:click="markAsAnswered(index)">Mark as answerd</button>
      </div>
      <div class="buttons" v-if="userGroup === 'student'">
        <button class="answering">&uarr;</button>
        <button class="mark" v-on:click="markAsAnswered(index)">&darr;</button>
      </div>
    </div>

    <div id="postQuestion" v-if="userGroup === 'student'">
      <div id="questionInput">
        <input v-model="qInput" type="text" name="qInput" id="qInput">
      </div>
      <button id="post" v-on:click="postQuestion">Post</button>
    </div>
  </div>
</template>

<script src="../API/QA"></script>

<style scoped>
@import url(../assets/main.css);

#header {
  margin-left: 20px;
  font-size: 45px;
  font-weight: bolder;
}

#title {
  margin-top: 40px;
  margin-left: 30px;
  top: 100px;
}

#subject {
  font-size: 35px;
}

#date {
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

.answering,
.mark {
  width: 150px;
  height: 30px;
  border-radius: 15px;
  border: none;
}

.mark:hover {
  background: aqua;
}

#postQuestion {
  position: absolute;
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
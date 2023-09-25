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
    <div class="question">
      <span class="qDetail">Why is x = 1 in question 24?</span>
      <span class="asker">Asked by: Andy</span>
      <div class="buttons">
        <button id="answering">Answering</button>
        <button id="mark">Mark as answerd</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  height: 588px;
  width: 995px;
  margin-top: 20px;
  margin-left: 30px;
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

#mark:hover {
  background: aqua;
}
</style>
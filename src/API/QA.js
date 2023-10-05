import axios from "axios"

const API_URL = "https://swinburne-398109.ts.r.appspot.com/swagger/json/api"

export default {
  data() {
    return {
      qStatus: 'Answering',
      newQuestion: '',
      questionArr: [],
      questionStatus: [],
      userGroup: 'tutor'
    }
  },

  methods: {
    beAnswered() {
      this.qStatus = 'Answered'
    },

    postQuestion() {
      if (this.qInput !== '') {
        this.questionArr.push(this.qInput)
        this.questionStatus.push('Answering')
        this.qInput = ''
      }
    },

    markAsAnswered(index) {
      this.questionStatus[index] = 'Answered'
    }

  }
}
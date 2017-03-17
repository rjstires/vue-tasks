import Vue from 'vue'
import uuid from 'uuid/v4'

export default Vue.component('NewBoard', {
  template: require('./newBoard.template.html'),
  data () {
    return {
      newBoardTitle: ''
    }
  },
  methods: {
    onEnter () {
      this.$store.commit('addBoard', {id: uuid(), title: this.newBoardTitle})
      this.newBoardTitle = ''
    }
  }
})

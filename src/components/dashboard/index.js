import Vue from 'vue'
import Board from '@/components/board'
import NewBoard from '@/components/newBoard'

require('./dashboard.css')

export default Vue.component('dashboard', {
  template: require('./dashboard.template.html'),
  computed: {
    boards () {
      return this.$store.state.boards
    }
  },

  components: {
    Board,
    NewBoard
  },

  methods: {
    addBoard (board) {
      this.$store.commit('addBoard', board)
    },

    removeBoard (boardId) {
      this.$store.commit('removeBoard', {boardId})
    },

    updateBoard (board) {
      this.$store.commit('updateBoard', board)
    }
  }
})

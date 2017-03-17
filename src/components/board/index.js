import Vue from 'vue'
import Task from '@/components/task'
import uuid from 'uuid/v4'

require('./board.css')

export default Vue.component('Board', {
  template: require('./board.template.html'),
  props: {
    board: Object
  },

  data () {
    return {
      newTaskTitle: ''
    }
  },

  computed: {},

  components: {
    Task
  },

  methods: {
    addTask () {
      const boardId = this.board.id
      const task = { id: uuid(), title: this.newTaskTitle, boardId }
      this.$store.commit('addTask', {
        boardId,
        task
      })
      this.newTaskTitle = ''
    },

    removeTask (boardId, taskId) {
      this.$store.commit('removeTask', { boardId, taskId })
    },

    updateTask (boardId, task) {
      this.$store.commit('updateTask', { boardId, task })
    }
  }
})

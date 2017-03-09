import Vue from 'vue'
import Task from '@/components/Task'

require('./board.css')

export default Vue.component('Board', {
  template: require('./board.template.html'),
  props: {
    title: String,
    id: Number,
    tasks: Array
  },

  data () {
    return {
      newTaskTitle: ''
    }
  },

  computed: {
    htmlID () {
      return `board-${this.id}`
    }
  },

  components: {
    Task
  },

  methods: {
    onEnter () {
      this.$emit('addTask', this.id, this.newTaskTitle)
      this.newTaskTitle = ''
    },

    removeTask (taskId) {
      this.$emit('removeTask', taskId, this.id)
    }
  }
})

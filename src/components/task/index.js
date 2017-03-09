import Vue from 'vue'

require('./task.css')

export default Vue.component('Task', {
  template: require('./task.template.html'),
  props: {
    title: String,
    id: Number
  },
  computed: {
    htmlId () {
      return `task-${this.id}`
    }
  },
  methods: {
    onClick () {
      this.$emit('removeTask', this.id)
    }
  }
})

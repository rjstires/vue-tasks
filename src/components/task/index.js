import Vue from 'vue'

require('./task.css')

export default Vue.component('Task', {
  template: require('./task.template.html'),
  props: {
    task: Object
  },
  computed: {},
  methods: {
    deleteTask () {
      this.$store.commit('removeTask', this.task)
    }
  }
})

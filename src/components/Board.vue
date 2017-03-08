<template>
<div class="col s3">
  <div class="card board grey lighten-2" :id="htmlID">
    <div class="card-content grey-text text-darken-2">
      <span class="card-title">{{title}}</span>
      <Task
        v-for="task in tasks"
        v-on:removeTask="removeTask"
        :title="task.title"
        :id="task.id" />
      <div class="card-action left-align">
        <input
          type="text"
          placeholder="New Task..."
          v-on:keyup.13="onEnter"
          v-model="newTaskTitle" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Task from './Task'

export default {
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
}
</script>

<style>
.card.board .card-content {
  padding: 12px 24px;
}

.card.board .card-content .card-title {
  text-align: left;
  font-size: 20px;
  line-height: 28px;
  margin-bottom: unset;
}

.card.board .card-action {
 padding: 8px 0;
}
</style>

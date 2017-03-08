<template>
  <div class="row" :id="htmlId">
    <div class="card task grey lighten-5" @click="onClick">
      <div class="card-content task">
        <span class="card-title">{{title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
}
</script>

<style>
.card.board .row {
  margin-bottom: 10px;
}

.card.task {
  cursor: pointer;
  margin: .5rem 0 0 0;
}

.card.task .card-content .card-title {
  font-size: 16px;
  line-height: 20px;
  margin-bottom: unset;
}

</style>

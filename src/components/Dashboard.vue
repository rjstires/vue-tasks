<template>
<div class="container">
  <div class="row">
    <Board
      v-for="board in boards"
      :title="board.title"
      :tasks="board.tasks"
      :id="board.id"
      :key="board.id"
      v-on:addTask="addTask"
      v-on:removeTask="removeTask" />
  </div>
</div>
</template>

<script>
import Board from './Board'
import R from 'ramda'

let addTaskToBoardWithId = R.curry(
  (boardID, task, boards) => R.map(
    R.when(
      R.propEq('id', boardID),
      R.evolve({tasks: R.append(task)})
    )
  )(boards)
)

let removeTaskFromBoardWithId = R.curry(
  (boardID, taskID, boards) => R.map(
    R.when(
      R.propEq('id', boardID),
      R.evolve({
        tasks: R.filter(R.compose(R.not, R.propEq('id', taskID)))
      })
    )
  )(boards)
)

export default {
  data () {
    return {
      boards: [
        {id: 1001, title: 'Board A', tasks: [{id: 11, title: 'Task A1'}, {id: 12, title: 'Task A2'}, {id: 13, title: 'Task A3'}]},
        {id: 1002, title: 'Board B', tasks: [{id: 21, title: 'Task B1'}, {id: 22, title: 'Task B2'}, {id: 23, title: 'Task B3'}]},
        {id: 1003, title: 'Board C', tasks: [{id: 31, title: 'Task C1'}, {id: 32, title: 'Task C2'}, {id: 33, title: 'Task C3'}]},
        {id: 1004, title: 'Board D', tasks: [{id: 41, title: 'Task D1'}, {id: 42, title: 'Task D2'}, {id: 43, title: 'Task D3'}]}
      ]
    }
  },

  components: {
    Board
  },

  methods: {
    addTask (boardId, taskTitle) {
      // todo Get next id
      let task = {id: 999, title: taskTitle}
      this.boards = addTaskToBoardWithId(boardId, task, this.boards)
    },
    removeTask (taskId, boardId) {
      this.boards = removeTaskFromBoardWithId(boardId, taskId, this.boards)
    }
  }
}
</script>

<style>
</style>

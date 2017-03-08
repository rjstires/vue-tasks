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

// todo This all needs to be extracted.
let getNextID = R.compose(
  R.add(1),
  R.head,
  R.sort((a, b) => b - a),
  R.map(R.prop('id'))
)

let findByIdThen = R.curry((fn, id, list) =>
    R.compose(
      fn,
      R.find(R.propEq('id', id))
    )(list)
  )

let nextTaskIDForBoard = R.compose(
  getNextID,
  R.prop('tasks')
)

let updateTasks = R.curry((fn, boardID, boards) =>
  R.map(
    R.when(
      R.propEq('id', boardID),
      R.evolve({tasks: fn})
    )
  )(boards)
)

let addTaskToBoard = R.curry((boardID, boards, task) =>
  updateTasks(
    R.append(task),
    boardID,
    boards
  )
)

let removeTaskFromBoard = R.curry((boardID, boards, taskID) =>
  updateTasks(
    R.reject(R.propEq('id', taskID)),
    boardID,
    boards
  )
)

export default {
  data () {
    return {
      boards: [
        {id: 1001, title: 'Board A', tasks: []},
        {id: 1002, title: 'Board B', tasks: []},
        {id: 1003, title: 'Board C', tasks: []},
        {id: 1004, title: 'Board D', tasks: []}
      ]
    }
  },

  components: {
    Board
  },

  methods: {
    addTask (boardID, taskTitle) {
      let task = {
        id: findByIdThen(nextTaskIDForBoard, boardID, this.boards),
        title: taskTitle
      }

      this.boards = addTaskToBoard(boardID, this.boards, task)
    },
    removeTask (taskID, boardID) {
      this.boards = removeTaskFromBoard(boardID, this.boards, taskID)
    }
  }
}
</script>

<style>
</style>

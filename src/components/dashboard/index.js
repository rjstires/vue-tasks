import Vue from 'vue'
import Board from '@/components/board'
import {
  addTaskToBoard, removeTaskFromBoard, findByIdThen, nextTaskIDForBoard, getBoards, addBoardToBoards, composeNewBoard
} from '@/services/task.service'

require('./dashboard.css')

export default Vue.component('dashboard', {
  template: require('./dashboard.template.html'),
  data () {
    return {
      boards: getBoards()
    }
  },

  components: {
    Board
  },

  methods: {
    createBoard () {
      this.boards = addBoardToBoards(this.boards, composeNewBoard(this.boards))
    },

    removeBoard () {},

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
})

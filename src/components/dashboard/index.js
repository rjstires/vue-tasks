import Vue from 'vue'
import Board from '@/components/board'
import {
  addTaskToBoard, removeTaskFromBoard, findByIdThen, nextTaskIDForBoard
} from '@/services/task.service'

require('./dashboard.css')

export default Vue.component('dashboard', {
  template: require('./dashboard.template.html'),
  data () {
    return {
      boards: [
        { id: 1001, title: 'Board A', tasks: [] },
        { id: 1002, title: 'Board B', tasks: [] },
        { id: 1003, title: 'Board C', tasks: [] },
        { id: 1004, title: 'Board D', tasks: [] }
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
})

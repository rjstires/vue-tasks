import {
  getTasks,
  getNextID,
  getNextIdOrZero,
  nextTaskIDForBoard,
  updateTasks,
  addTaskToBoard,
  removeTaskFromBoard,
  addBoardToBoards,
  composeNewBoard,
  composeNewTask,
  getBoards
} from './task.service.js'

describe('Task Service', () => {
  describe('#getTasks', () => {
    it('Returns the value of the `task` property.', () => {
      expect(
        getTasks({ tasks: 123456 })
      ).to.equal(123456)
    })
  })

  describe('#getNextID ', () => {
    it('Returns the next ID.', () => {
      expect(
        getNextID([{ id: 0 }, { id: 1 }])
      ).to.equal(2)
    })
  })

  describe('#getNextIdOrZero', () => {
    it('Returns the next ID.', () => {
      expect(
        getNextIdOrZero([{ id: 0 }, { id: 2 }])
      ).to.equal(3)
    })

    it('Returns zero when given an empty array.', () => {
      expect(
        getNextIdOrZero([])
      ).to.equal(0)
    })
  })

  describe('#findByIdThen', () => { })

  describe('#nextTaskIDForBoard', () => {
    it('Returns the next task ID for a board.', () => {
      const tasks = [{ id: 1 }, { id: 7 }]
      const board = { tasks }
      expect(
        nextTaskIDForBoard(board)
      ).to.equal(8)
    })

    it('Returns zero if board has no tasks.', () => {
      expect(
        nextTaskIDForBoard({ tasks: [] })
      ).to.equal(0)
    })
  })

  describe('#updateTasks', () => {
    it('Returns boards with tasks of the board specified updated by function provided.', () => {
      const provided = [
        {
          id: 0,
          tasks: [
            { id: 1, title: 'abc' },
            { id: 2, title: 'def' },
            { id: 3, title: 'ghi' }
          ]
        },
        {
          id: 1,
          tasks: []
        },
        {
          id: 999,
          tasks: [
            { id: 1, title: 'abc' },
            { id: 2, title: 'def' },
            { id: 3, title: 'ghi' }
          ]
        }
      ]

      const expected = [
        {
          id: 0,
          tasks: [
            { id: 1, title: 'abc' },
            { id: 2, title: 'def' },
            { id: 3, title: 'ghi' }
          ]
        },
        {
          id: 1,
          tasks: []
        },
        {
          id: 999,
          tasks: [
            { id: 5, title: 'ABC' },
            { id: 10, title: 'DEF' },
            { id: 15, title: 'GHI' }
          ]
        }
      ]

      const whatever = (task) => {
        return task.map((task) => {
          return { id: task.id * 5, title: task.title.toUpperCase() }
        })
      }

      expect(
        updateTasks(whatever, 999, provided)
      ).to.eql(expected)
    })
  })

  describe('#addTaskToBoard', () => {
    it('Returns board with task added.', () => {
      const newTask = { id: 999, title: 'this is a unique task' }
      const provided = [
        { id: 1, tasks: [{ id: 1, title: 'Board1Task1' }, { id: 2, title: 'Board1Task2' }] },
        { id: 2, tasks: [{ id: 1, title: 'Board2Task1' }, { id: 2, title: 'Board2Task2' }] },
        { id: 3, tasks: [{ id: 1, title: 'Board3Task1' }, { id: 2, title: 'Board3Task2' }] }
      ]

      const expected = [
        { id: 1, tasks: [{ id: 1, title: 'Board1Task1' }, { id: 2, title: 'Board1Task2' }] },
        { id: 2, tasks: [{ id: 1, title: 'Board2Task1' }, { id: 2, title: 'Board2Task2' }, newTask] },
        { id: 3, tasks: [{ id: 1, title: 'Board3Task1' }, { id: 2, title: 'Board3Task2' }] }
      ]

      expect(
        addTaskToBoard(2, provided, newTask)
      ).to.eql(expected)
    })
  })

  describe('#removeTaskFromBoard', () => {
    it('Returns board with task removed.', () => {
      const provided = [
        { id: 1, tasks: [{ id: 1, title: 'Board1Task1' }, { id: 2, title: 'Board1Task2' }] },
        { id: 2, tasks: [{ id: 1, title: 'Board2Task1' }, { id: 2, title: 'Board2Task2' }] },
        { id: 3, tasks: [{ id: 1, title: 'Board3Task1' }, { id: 2, title: 'Board3Task2' }] }
      ]

      const expected = [
        { id: 1, tasks: [{ id: 1, title: 'Board1Task1' }, { id: 2, title: 'Board1Task2' }] },
        { id: 2, tasks: [{ id: 1, title: 'Board2Task1' }, { id: 2, title: 'Board2Task2' }] },
        { id: 3, tasks: [{ id: 2, title: 'Board3Task2' }] }
      ]

      expect(
        removeTaskFromBoard(3, provided, 1)
      ).to.eql(expected)
    })
  })

  describe('#addBoardToBoards', () => {
    it('Returns boards with board added.', () => {
      const newBoard = { id: 999, tasks: [] }
      const provided = [
        { id: 1, tasks: [{ id: 1, title: 'Board1Task1' }, { id: 2, title: 'Board1Task2' }] },
        { id: 2, tasks: [{ id: 1, title: 'Board2Task1' }, { id: 2, title: 'Board2Task2' }] },
        { id: 3, tasks: [{ id: 1, title: 'Board3Task1' }, { id: 2, title: 'Board3Task2' }] }
      ]

      const expected = [...provided, newBoard]

      expect(
        addBoardToBoards(provided, newBoard)
      ).to.eql(expected)
    })
  })

  describe('#composeNewBoard', () => {
    it('Returns an object with the next ID preloaded.', () => {
      const newBoard = {
        id: 71,
        title: '',
        tasks: []
      }

      const boards = [
        { id: 1, tasks: [] },
        { id: 2, tasks: [] },
        { id: 3, tasks: [] },
        { id: 70, tasks: [] }
      ]

      expect(
        composeNewBoard(boards)
      ).to.eql(newBoard)
    })
  })

  describe('#composeNewTask', () => {
    it('Returns an object', () => {
      const provided = [
        { id: 1, title: '' },
        { id: 2, title: '' },
        { id: 17, title: '' }
      ]

      const newTask = {
        id: 18,
        title: ''
      }

      expect(
        composeNewTask(provided)
      ).to.eql(newTask)
    })
  })

  describe('#getBoards', () => {
    it('Returns an array.', () => {
      expect(getBoards()).to.be.an.array
    })
  })
})

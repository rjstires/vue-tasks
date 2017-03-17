import R from 'ramda'
import { sortDescending } from './sort.service'

export const returnZero = R.always(0)
export const getTasks = R.prop('tasks')

export const getNextID = R.compose(
  R.add(1),
  R.head,
  sortDescending,
  R.map(R.prop('id'))
)// ([{id: Number}])

export const getNextIdOrZero = R.compose(
  R.ifElse(
    R.isEmpty,
    returnZero,
    getNextID
  ),
) // ([{id: Number}])

export const findByIdThen = R.curry((fn, id, list) =>
  R.compose(
    fn,
    R.find(R.propEq('id', id))
  )(list)
)

export const nextTaskIDForBoard = R.compose(
  getNextIdOrZero,
  getTasks
)

export const updateTasks = R.curry((fn, boardID, boards) =>
  R.map(
    R.when(
      R.propEq('id', boardID),
      R.evolve({ tasks: fn })
    )
  )(boards)
)

export const addTaskToBoard = R.curry((boardID, boards, task) =>
  updateTasks(
    R.append(task),
    boardID,
    boards
  )
)

export const removeTaskFromBoard = R.curry((boardID, boards, taskID) =>
  updateTasks(
    R.reject(R.propEq('id', taskID)),
    boardID,
    boards
  )
)

export const addBoardToBoards = R.curry((boards, board) => {
  return R.compose(
    R.append(board)
  )(boards)
})

export const composeNewBoard = (currentBoards) => {
  return {
    id: getNextIdOrZero(currentBoards),
    title: '',
    tasks: []
  }
}

export const composeNewTask = (tasks) => {
  return {
    id: getNextIdOrZero(tasks),
    title: ''
  }
}

export const getBoards = () => {
  return []
}

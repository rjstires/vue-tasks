import R from 'ramda'

// todo This all needs to be extracted.
export const getNextID = R.compose(
  R.add(1),
  R.head,
  R.sort((a, b) => b - a),
  R.map(R.prop('id'))
)

export const findByIdThen = R.curry((fn, id, list) =>
  R.compose(
    fn,
    R.find(R.propEq('id', id))
  )(list)
)

export const nextTaskIDForBoard = R.compose(
  getNextID,
  R.prop('tasks')
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

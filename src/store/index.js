import Vue from 'vue'
import Vuex from 'vuex'
import R from 'ramda'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'PRODUCTION'

export default new Vuex.Store({
  state: {
    boards: []
  },

  getters: {
    getBoardById: (state, getters) => (id) => {
      return state.boards.find((board) => board.id === id)
    }
  },

  mutations: {

    addBoard (state, board) {
      state.boards = R.append({ ...board, tasks: [] })(state.boards)
    },

    removeBoard (state, { boardId }) {
      const idEquals = R.propEq('id', boardId)
      state.boards = R.reject(idEquals)(state.boards)
    },

    addTask (state, { boardId, task }) {
      state.boards = R.map(
        R.when(
          R.propEq('id', boardId),
          R.evolve({
            tasks: R.ifElse(
              R.isEmpty,
              R.always([task]),
              R.append(task)
            )
          })
        )
      )(state.boards)
    },

    removeTask (state, { boardId, id }) {
      state.boards = R.map(
        R.when(
          R.propEq('id', boardId),
          R.evolve({
            tasks: R.reject((task) => task.id === id)
          })
        )
      )(state.boards)
    }
  },

  strict: debug
})

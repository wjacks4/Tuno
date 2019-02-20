import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    premtoken: null,
    premuser: null,
    isUserLoggedIn: false,
    isPremUserLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    setPremToken (state, premtoken) {
      state.premtoken = premtoken
      if (premtoken) {
        state.isPremUserLoggedIn = true
      } else {
        state.isPremUserLoggedIn = false
      }
    },
    setPremUser (state, premuser) {
      state.premuser = premuser
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setPremToken ({commit}, premtoken) {
      commit('setPremToken', premtoken)
    },
    setPremUser ({commit}, premuser) {
      commit('setPremUser', premuser)
    }
  }
})

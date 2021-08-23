import Vue from "vue";
import Vuex from "vuex";

import { SET_USER_ID } from "./actions.type";

Vue.use(Vuex);

const state = {
  userId: "",
};

const getters = {
  currentUserId(state) {
    return state.userId;
  },
};

const actions = {
  [SET_USER_ID](context, userId) {
    context.commit(SET_USER_ID, userId);
  },
};

const mutations = {
  [SET_USER_ID](state, userId) {
    state.userId = userId;
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  // modules: {},
});

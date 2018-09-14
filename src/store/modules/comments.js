import Vue from 'vue';
import Vuex from 'vuex';
import { Comment, WS } from '../models/comment';

Vue.use(Vuex);

const NEW_COMMENT = 'NEW_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

export default {
  state: {
    comments: [],
    ws: null,
  },
  mutations: {
    NEW_COMMENT(state, text) {
      state.comments.push(new Comment(text));
    },
    DELETE_COMMENT(state, id) {
      state.comments.splice(state.comments.findIndex(comment => comment.id === id), 1);
    },
  },
  actions: {
    newComment({ commit }, text) {
      commit(NEW_COMMENT, text);
    },
    deleteComment({ state, dispatch }, id) {
      if (!state.ws) state.ws = new WS(dispatch);
      state.ws.delete(id);
    },
    confirmDelete({ commit }, id) {
      commit(DELETE_COMMENT, id);
    },
  },
};

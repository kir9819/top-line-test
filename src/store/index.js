import Vue from 'vue';
import Vuex from 'vuex';

import calculator from './modules/calculator';
import comments from './modules/comments';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    calculator,
    comments,
  },
});

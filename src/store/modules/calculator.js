import Vue from 'vue';
import Vuex from 'vuex';
import { FractionTask, FractionResult } from '../models/fraction';

Vue.use(Vuex);

const SET_ACTION = 'SET_ACTION';
const CLEAR_RESULT = 'CLEAR_RESULT';

function gcd(a, b) {
  if (b === 0) {
    return Math.abs(a);
  }
  return gcd(b, a % b);
}

function reduceFraction({ numerator, denominator }) {
  const currGCD = gcd(numerator, denominator);
  numerator /= currGCD;
  denominator /= currGCD;
  if (denominator < 0) {
    numerator *= -1;
    denominator *= -1;
  }
  return { numerator, denominator };
}

export default {
  state: {
    fractions: [],
    actions: [],
    result: new FractionResult(),
  },
  mutations: {
    SET_ACTION(state, { index, action }) {
      Vue.set(state.actions, index, action);
    },
    CLEAR_RESULT(state) {
      state.result.clear();
    },
  },
  actions: {
    newFraction({ state, commit, dispatch }) {
      state.fractions.push(new FractionTask(dispatch));
      if (state.fractions.length > 1) {
        state.actions.push(null);
      }
      commit(CLEAR_RESULT);
    },
    setAction({ commit, dispatch }, { index, action }) {
      commit(SET_ACTION, { index, action });
      dispatch('calculate');
    },
    calculate({ state, commit }) {
      let currNumerator = 0;
      let currDenominator = 0;
      if (!state.fractions.every(fraction => fraction.check())) {
        commit(CLEAR_RESULT);
        return;
      }
      if (!state.actions.every(action => action)) {
        commit(CLEAR_RESULT);
        return;
      }

      currNumerator = state.fractions[0].numerator;
      currDenominator = state.fractions[0].denominator;

      for (let i = 0; i < state.actions.length; i += 1) {
        const { numerator, denominator } = state.fractions[i + 1];
        switch (state.actions[i]) {
          case '+':
            currNumerator = (currNumerator * denominator) + (currDenominator * numerator);
            currDenominator *= denominator;
            break;
          case '-':
            currNumerator = (currNumerator * denominator) - (currDenominator * numerator);
            currDenominator *= denominator;
            break;
          case '*':
            currNumerator *= numerator;
            currDenominator *= denominator;
            break;
          case '/':
            if (+numerator === 0) {
              commit(CLEAR_RESULT);
              return;
            }
            currNumerator *= denominator;
            currDenominator *= numerator;
            break;
          default:
            commit(CLEAR_RESULT);
            return;
        }
        ({ numerator: currNumerator, denominator: currDenominator } =
          reduceFraction({ numerator: currNumerator, denominator: currDenominator }));
      }
      state.result.numerator = currNumerator;
      state.result.denominator = currDenominator;
    },
  },
};

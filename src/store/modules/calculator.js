import Vue from 'vue';
import Vuex from 'vuex';
import { FractionTask, FractionResult } from '../models/fraction';

Vue.use(Vuex);

const SET_ACTION = 'SET_ACTION';

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
      Vue.set(state.actions, index, action)
    },
  },
  actions: {
    newFraction({ state, dispatch }) {
      state.fractions = new Array(...state.fractions, new FractionTask(dispatch));
      if (state.fractions.length > 1) {
        state.actions = [...state.actions, null];
      }
    },
    setAction({ commit, dispatch }, { index, action }) {
      commit(SET_ACTION, { index, action });
      dispatch('calculate');
    },
    calculate({ state }) {
      let currNumerator = 0;
      let currDenominator = 0;
      if (!state.fractions.every(fraction => fraction.check())) {
        state.result.clear();
        return;
      }
      if (!state.actions.every(action => action)) {
        state.result.clear();
        return;
      }

      currNumerator = state.fractions[0].numerator;
      currDenominator = state.fractions[0].denominator;

      for (let i = 0; i < state.actions.length; i += 1) {
        let { numerator, denominator } = state.fractions[i + 1];
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
              state.result.clear();
              return;
            }
            currNumerator *= denominator;
            currDenominator *= numerator;
            break;
          default:
            state.result.clear();
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

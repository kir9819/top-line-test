<template>
  <div class="fraction">
    <div class="result" v-if="isResult">=</div>
    <div class="fraction-body">
      <div class="numerator">
        <input
          :disabled="isResult"
          :size="(+fraction.numerator).toString().length"
          type="text"
          v-model="fraction.numerator"
          oninput="this.value = this.value.replace(/\D/g, '')"
        >
      </div>
      <div class="denominator">
        <input
          :disabled="isResult"
          :size="(+fraction.denominator).toString().length"
          type="text"
          v-model="fraction.denominator"
          oninput="this.value = this.value.replace(/\D/g, '')"
        >
      </div>
    </div>
    <input
      maxlength="1"
      v-if="isAction"
      class="action"
      type="text"
      v-model="currAction"
      oninput="this.value = this.value.replace(/[^+-/*]/g, '')"
    >
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {

    };
  },
  props: ['fraction', 'action', 'isAction', 'index', 'isResult'],
  computed: {
    currAction: {
      get () {
        return this.action;
      },
      set (v) {
        this.setAction({ index: this.index, action: v });
      },
    },
  },
  methods: {
    ...mapActions(['setAction']),
  },
};
</script>

<style scoped>
input {
  padding: 10px;
  text-align: center;
  margin: auto;
  border: 1px solid lightgray;
  border-radius: 5px;
}
input:focus {
  outline: none;
}
.numerator::after {
  content: '';
  display: block;
  height: 1px;
  margin: 2px 0;
  width: 100%;
  background-color: black;
}
.fraction {
  display: flex;
}
.fraction-body {
  margin-left: 5px;
  margin-right: 5px;
}
.numerator {
  display: block;
  text-align: center;
}
.denominator {
  display: block;
  text-align: center;
}
.result {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 5px;
}
.action {
  margin-top: auto;
  margin-bottom: auto;
  width: 20px;
}
</style>

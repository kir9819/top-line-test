<template>
  <div>
    <div class="calculator">
      <fraction
        v-for="(fraction, index) in fractions"
        :key="index"
        :fraction="fraction"
        :action="actions[index]"
        :isAction="index < actions.length"
        :index="index"
      />
      <fraction :fraction="result" :isResult="true"/>
    </div>
    <input type="button" class="addFraction" @click="newFraction" value="Add Fraction">
  </div>
</template>

<script>
import Fraction from '@/components/Fraction.vue';
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {

    };
  },
  created() {
    if (this.fractions.length) return;
    this.newFraction();
    this.newFraction();
  },
  computed: {
    ...mapState({
      fractions: state => state.calculator.fractions,
      actions: state => state.calculator.actions,
      result: state => state.calculator.result,
    }),
  },
  methods: {
    ...mapActions(['newFraction']),
  },
  components: {
    Fraction,
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
.calculator {
  display: flex;
  justify-content: center;
}
.addFraction {
  border: none;
  background-color: white;
  text-decoration: underline;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
  font-size: 16px;
}
</style>

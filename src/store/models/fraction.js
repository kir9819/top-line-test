class Fraction {
  constructor() {
    this.currNumerator = null;
    this.currDenominator = null;
  }

  check() {
    return !!+this.currDenominator;
  }

  get numerator() {
    return this.currNumerator;
  }

  set numerator(value) {
    this.currNumerator = value;
  }

  get denominator() {
    return this.currDenominator;
  }

  set denominator(value) {
    this.currDenominator = value;
  }
}

export class FractionTask extends Fraction {
  constructor(dispatch) {
    super();
    this.calculate = dispatch;
  }

  get numerator() {
    return this.currNumerator;
  }

  set numerator(value) {
    this.currNumerator = value;
    this.calculate('calculate');
  }

  get denominator() {
    return this.currDenominator;
  }

  set denominator(value) {
    this.currDenominator = value;
    this.calculate('calculate');
  }
}

export class FractionResult extends Fraction {
  clear() {
    this.numerator = null;
    this.denominator = null;
  }
}

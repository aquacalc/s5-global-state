const counter = () => {
  let count = $state(0);

  return {
    get value() {
      return count;
    },
    increment() {
      count++;
    },
    decrement() {
      count--;
    },
    reset() {
      count = 0;
    },
    get square() {
      let yadda = count * count
      return yadda;
    },
  }
}

export const myCounter = counter();
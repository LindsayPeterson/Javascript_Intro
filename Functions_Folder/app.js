function setupCounter( val ) {
    return function counter() {
        return val++;
    }
}

let counter1 = setupCounter(0);
console.log(counter1());
console.log(counter1());
let counter2= setupCounter(10);
console.log(counter2());
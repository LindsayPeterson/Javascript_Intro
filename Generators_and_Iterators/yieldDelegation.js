function* gen1() {
    yield 1;
    yield 2;
    return 4
}

function* gen2() {
    const val = yield* gen1();
    yield 3;
    yield val;
}

const it = gen2();
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())


// function gen1() {
//     return['three', 'six', 'nine']
// }

// function* gen2() {
//     const val = yield* gen1();
// }

// const it = gen2();
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
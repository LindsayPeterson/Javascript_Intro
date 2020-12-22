#! /usr/bin/env node

const arr = [0, 3, 4, 6];

const it = arr[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');
const mapIterator = map[Symbol.iterator]();
console.log(mapIterator.next().value);
console.log(mapIterator.next().value);

for (const [key, value] of map) {
    console.log(`${key} and ${value}`);
}

const mySet = new Set();
mySet.add('one');
mySet.add('two');

const setIterator = mySet[Symbol.iterator]();
console.log(setIterator.next());
console.log(setIterator.next());
console.log(setIterator.next());

for(const value of mySet) {
    console.log(value)
}
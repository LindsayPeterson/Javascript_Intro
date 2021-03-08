#! /usr/bin/env node
function* timestampGenerator() {
    var ts = Date.now();
    console.log('original ts: ', ts)
    yield ts;
    var additionalTime = yield;
    console.log(additionalTime);
    if (additionalTime) {
        ts = ts + additionalTime;
    }
    console.log('updated ts: ', ts)
}
// executing the generator function doesn't execute the code
// we need an iterator
const it =timestampGenerator();
const originalTimestamp = it.next()
console.log(originalTimestamp)
it.next();
it.next(100 * 60)
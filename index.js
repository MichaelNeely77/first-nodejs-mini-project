const c = require('./hello');

const a = 100;
const b = 'world';

const d = require('./hello2');

console.log(a + b);
console.log(c);
console.log(d);

console.log(d.first+ ' ' + d.second);
const mathsTools = require('./js/mathsTools');

let r = [];
let x = 100000;
for (let i = 0; i < 100000; i++) {
    r.push(mathsTools.obfuscate(0 + i));
}

console.log(r);

console.log(mathsTools.restore(mathsTools.obfuscate(234634)));
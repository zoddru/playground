const mathsTools = require('./js/mathsTools');

let r = [];
let x = 100000;
for (let i = 0; i < 100000; i++) {
    r.push(mathsTools.obfuscate(0 + i));
}

console.log(r);

/*
const m = {};

r.map((v, i) => { m[v] = (m[v] || []); m[v].push(i); });

for (let num in m) {
    if (m[num].length > 1)
        console.log(num + ' : ' + m[num]);
}
*/

console.log(mathsTools.restore(mathsTools.obfuscate(234634)));
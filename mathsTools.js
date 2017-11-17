const mathsTools = {
    toDigits: function(num) {
        const chars = num.toString().split('');
        const digits = chars.map(Number);
        digits.reverse();
        return digits;
    },

    toNumber: function (digits) {
        let n = 0;
        digits.forEach((d, i) => n += (d * Math.pow(10, i)));
        return n;
    },

    _obfuscate: function (x) {

        // https://stackoverflow.com/questions/8554286/obfuscating-an-id
        const mask1 = 0x00550055; 
        const d1 = 7;
        const mask2 = 0x0000cccc;
        const d2 = 14;

        // Obfuscate
        let t = (x ^ (x >> d1)) & mask1;
        let u = x ^ t ^ (t << d1);
        t = (u ^ (u  >> d2)) & mask2;
        return (u ^ t ^ (t << d2));
    },

    _restore: function (y) {
        const mask1 = 0x00550055; 
        const d1 = 7;
        const mask2 = 0x0000cccc;
        const d2 = 14;

        let t = (y ^ (y >> d2)) & mask2;
        let u = y ^ t ^ (t << d2);
        t = (u ^ (u >> d1)) & mask1;
        return u ^ t ^ (t << d1);
    },

    obfuscate: function (num) {
        return this._obfuscate(num).toString(36);
    },

    restore: function (base36) {
        return this._restore(parseInt(base36, 36));
    }
};

Object.freeze(mathsTools);

let r = [];
for (let i = 0; i < 3000000; i++) {
    r.push(mathsTools.obfuscate(i));
}

//console.log(r);

//r = [12, 123, 34, 1, 34, 12, 234, 2];
const m = {};

r.map((v, i) => { m[v] = (m[v] || []); m[v].push(i); });

for (let num in m) {
    if (m[num].length > 1)
    console.log(num + ' : ' + m[num]);
}

console.log(mathsTools.restore(mathsTools.obfuscate(234634)));



module.exports = {
    mathsTools: mathsTools
};
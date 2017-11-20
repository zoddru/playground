function callbackExample() {

    function get(callback) {
        setTimeout(() => callback('secret'), 300);
    }

    function process(value, callback) {
        setTimeout(() => callback(`${value}-code (callback)`), 300);
    }

    function main() {
        get(value => process(value, result => console.log(result)));
    }
    
    main();
}

function promiseExample() {

    function get() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve('secret'), 200);
        });
    }

    function process(value) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(`${value}-code (promise)`), 200);
        });
    }

    function main() {
        get()
            .then(process)
            .then(result => console.log(result));
    }
    
    main();
}

function asyncAwaitExample() {

    async function get() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve('secret'), 100);
        });
    }

    async function process(value) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(`${value}-code (asyncAwait)`), 100);
        });
    }

    async function main() {
        let val = await get();
        let result = await process(val);
        console.log(result);
    }
    
    main();
}

callbackExample();
promiseExample();
asyncAwaitExample();



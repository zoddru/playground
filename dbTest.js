const MongoClient = require('mongodb').MongoClient;
const data = require('./js/data');
const connectionString = 'mongodb://admin:ninjalemonTEA31@playground-shard-00-00-jlue1.mongodb.net:27017,playground-shard-00-01-jlue1.mongodb.net:27017,playground-shard-00-02-jlue1.mongodb.net:27017/test?ssl=true&replicaSet=Playground-shard-0&authSource=admin';


function callbackExample() {
    
    function get(got) {
        MongoClient.connect(connectionString, (function(err, db) {
            db.collection('urls').find().toArray(function(err, items) {
                db.close();
                got(items);
            });
        }));
    }

    function main() {
        get(items => console.log(items));
    }
    
    main();
}

function promiseExample() {

    function get() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(connectionString, (function(err, db) {
                db.collection('urls').find().toArray(function(err, items) {
                    db.close();
                    resolve(items);
                });
            }));
        });
    }

    function main() {
        get().then(result => console.log(result));
    }
    
    main();
}

function asyncAwaitExample() {

    async function get() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(connectionString, (function(err, db) {
                db.collection('urls').find().toArray(function(err, items) {
                    db.close();
                    resolve(items);
                });
            }));
        });
    }

    async function main() {
        let items = await get();
        console.log(items);
    }
    
    main();
}

callbackExample();
promiseExample();
asyncAwaitExample();

async function dataTest() {
    let url = data.url.get();
    console.log({
        from: 'dataTest',
        url: url
    });
}

dataTest();
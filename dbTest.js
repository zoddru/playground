const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://admin:ninjalemonTEA31@playground-shard-00-00-jlue1.mongodb.net:27017,playground-shard-00-01-jlue1.mongodb.net:27017,playground-shard-00-02-jlue1.mongodb.net:27017/test?ssl=true&replicaSet=Playground-shard-0&authSource=admin', function(err, db) {

    const     

    const urls = db.collection('urls').find().toArray(function(err, items) {
        console.log(items);
        db.close();
    });
});
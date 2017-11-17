const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb://admin:ninjalemonTEA31@playground-shard-00-00-jlue1.mongodb.net:27017,playground-shard-00-01-jlue1.mongodb.net:27017,playground-shard-00-02-jlue1.mongodb.net:27017/test?ssl=true&replicaSet=Playground-shard-0&authSource=admin';

const data = {

    url: {
        put: function (url) {
            MongoClient.connect(connectionString, function(err, db) {   
                const item = {
                    url: url 
                };
                
                db.collection('urls').insertOne(item, function (err, result) {
                    db.close();
                });
            });
        },
    
        get: async function (code) {

            let url;

            await MongoClient.connect(connectionString, function(err, db) {                   
                url = db.collection('urls').findOne();
                db.close();
            });

            return url;
        }
    }
};

Object.freeze(data);

module.exports = data;
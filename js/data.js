const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb://admin:ninjalemonTEA31@playground-shard-00-00-jlue1.mongodb.net:27017,playground-shard-00-01-jlue1.mongodb.net:27017,playground-shard-00-02-jlue1.mongodb.net:27017/test?ssl=true&replicaSet=Playground-shard-0&authSource=admin';

function findOne(query) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(connectionString, function (err, db) {
            if (err) 
                throw err
        
            db.collection('urls')
                .findOne(query, function (err, result) {
                    if (err)
                        throw err

                    db.close();
            
                    resolve(result);
                });
        });
    });
}

const data = {

    url: {
        put: async function (url) {
            //const found = await findOne({ url: code });
            
            //if (!!found)
            //    return found;
            
            return new Promise((resolve, reject) => {
                MongoClient.connect(connectionString, function(err, db) {   
                    if (err)
                        throw err;

                    const item = {
                        url: url 
                    };
                    
                    db.collection('urls')
                        .insertOne(item, function (err, result) {
                            if (err)
                                throw err;
                                
                            db.close();

                            resolve(result);
                        });
                });
            });
        },
    
        get: function (code) {
            return findOne({ _id: code });
        },

        getAll: function () {
            return new Promise(function (resolve, reject) {
                MongoClient.connect(connectionString, function (err, db) {
                    if (err)
                        throw err
                
                    db.collection('urls')
                        .find()
                        .toArray(function (err, result) {

                            if (err)
                                throw err
        
                            db.close();
                    
                            resolve(result);
                        });
                });
            });
        }
    }
};

Object.freeze(data);

module.exports = data;
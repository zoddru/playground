const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb://admin:ninjalemonTEA31@playground-shard-00-00-jlue1.mongodb.net:27017,playground-shard-00-01-jlue1.mongodb.net:27017,playground-shard-00-02-jlue1.mongodb.net:27017/test?ssl=true&replicaSet=Playground-shard-0&authSource=admin';
const mathsTools = require('./mathsTools.js');

function connectAndExecute(toExecute) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(connectionString, (err, db) => {
            if (err) {
                reject(err);
                return;
            }

            toExecute(db, resolve, reject);
        });
    });
}

const data = {

    url: {
        nextId: function () {
            return connectAndExecute((db, resolve, reject) => {
                db.collection('counters').findAndModify(
                    { _id: 'urls' },
                    [['_id', 'asc']],
                    { $inc: { seq: 1 } },
                    { new: true },
                    (err, result) => {
                        db.close();

                        if (err) {
                            reject(err);
                            return;
                        }

                        if (!result.ok) {
                            reject(result.lastErrorObject);
                            return;
                        }

                        resolve(result.value);
                    });
            });
        },

        findByUrl: function (url) {
            return connectAndExecute((db, resolve, reject) => {
                db.collection('urls').findOne({ url: url }, (err, result) => {
                    db.close();

                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(result);
                });
            });
        },

        findByCode: function (code) {
            return connectAndExecute((db, resolve, reject) => {
                db.collection('urls').findOne({ code: code }, (err, result) => {
                    db.close();

                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(result);
                });
            });
        },

        findAll: function () {
            return connectAndExecute((db, resolve, reject) => {
                db.collection('urls').find().toArray((err, result) => {
                    db.close();

                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(result);
                });
            });
        },

        save: async function (url) {
            const found = await this.findByUrl(url);

            if (!!found)
                return found;

            const nextId = await this.nextId();

            const code = mathsTools.obfuscate(nextId.seq);

            return connectAndExecute((db, resolve, reject) => {
                db.collection('urls').findAndModify(
                    { url: 'url' },
                    [['_id', 'asc']],
                    { code: code, url: url },
                    { new: true, upsert : true },
                    (err, result) => {
                        db.close();

                        if (err) {
                            reject(err);
                            return;
                        }

                        if (!result.ok) {
                            reject(result.lastErrorObject);
                            return;
                        }

                        resolve(result.value);
                    });
            });
        }
    }
};

Object.freeze(data);

module.exports = data;
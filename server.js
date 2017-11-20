const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mathsTools = require('./js/mathsTools.js');
const data = require('./js/data.js');
const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb://admin:ninjalemonTEA31@playground-shard-00-00-jlue1.mongodb.net:27017,playground-shard-00-01-jlue1.mongodb.net:27017,playground-shard-00-02-jlue1.mongodb.net:27017/test?ssl=true&replicaSet=Playground-shard-0&authSource=admin';


app.get('/', (request, response) => response.sendFile('index.html', { root: __dirname + '\\public' } ))
    .use(express.static('public'))

    .get('/obfuscate/:number', (req, res) => res.json({
        number: req.params.number,
        code: mathsTools.obfuscate(req.params.number)
    }))

    .get('/restore/:code', (req, res) => res.json({
        code: req.params.code,
        number: mathsTools.restore(req.params.code)
    }))

    .get('/url', async (req, res) => {
        res.json(await data.url.getAll());
    })
    
    .get('/url/save/:url', async (req, res) => {
        res.json(await data.url.put(req.params.url));
    })

    .get('/url/:code', async (req, res) => {
        res.json(await data.url.get(req.params.code));
    })

    .get('/sample/text', (request, response) => response.send('<ul><li>a</li><li>b</li><li>c</li></ul>'))
    .get('/sample/json', (request, response) => response.json(['a', 'b', 'c']))
    .get('/sample/redirect', (request, response) => response.redirect('/sample/text'))
    .listen(port, () => console.log('listening on port ' + port));
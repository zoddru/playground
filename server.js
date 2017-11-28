const express = require('express');
//const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const mathsTools = require('./js/mathsTools.js');
const data = require('./js/data.js');
const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb://admin:ninjalemonTEA31@playground-shard-00-00-jlue1.mongodb.net:27017,playground-shard-00-01-jlue1.mongodb.net:27017,playground-shard-00-02-jlue1.mongodb.net:27017/test?ssl=true&replicaSet=Playground-shard-0&authSource=admin';


const save = async (req, res) => {
    
    // todo: handle post using a "body-parser"
    // https://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters

    if (!req.query.url) {
        console.log(`error for ${req.url} - no url parameter`);
        res.json({ error: true, message: 'url parameter is required' });
        return;
    }

    res.json(await data.url.save(req.query.url));
};


app.get('/', (request, response) => response.sendFile('index.html', { root: __dirname + '\\public' }))
    .use(express.static('public'))

    .get('/api/obfuscate/:number', (req, res) => res.json({
        number: req.params.number,
        code: mathsTools.obfuscate(req.params.number)
    }))

    .get('/api/restore/:code', (req, res) => res.json({
        code: req.params.code,
        number: mathsTools.restore(req.params.code)
    }))

    .get('/api/urls/nextId', async (req, res) => {
        res.json(await data.url.nextId());
    })

    .get('/api/urls', async (req, res) => {

        if (req.query.url) {
            res.json(await data.url.findByUrl(req.query.url));
            return;
        }

        if (req.query.code) {
            res.json(await data.url.findByCode(req.query.code));
            return;
        }

        res.json(await data.url.findAll());
    })
    
    .get('/api/urls/save', save)
    .post('/api/urls/save', save)
    
    .get('/api/urls/:code', async (req, res) => {
        res.json(await data.url.findByCode(req.params.code));
    })
    
    .get('/a/:code', async (req, res) => {
        res.json(await data.url.findByCode(req.params.code));
    })
    
    .listen(port, () => console.log('listening on port ' + port));
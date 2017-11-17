const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mathsTools = require('./js/mathsTools.js');
const data = require('./js/data.js');


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

    .get('/url/get/:code', (req, res) => data.url.get())

    .get('/sample/text', (request, response) => response.send('<ul><li>a</li><li>b</li><li>c</li></ul>'))
    .get('/sample/json', (request, response) => response.json(['a', 'b', 'c']))
    .get('/sample/redirect', (request, response) => response.redirect('/sample/text'))
    .listen(port, () => console.log('listening on port ' + port));
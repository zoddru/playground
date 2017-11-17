const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', function(request, response) {
    response.sendFile('index.html', { root: __dirname + '\\public' } );
});

app.use(express.static('public'));

app.get('/sample/text', function(request, response) {
    const text = '<ul><li>a</li><li>b</li><li>c</li></ul>';
    response.send(text);
});

app.get('/sample/json', function(request, response) {
    const items = ['a', 'b', 'c'];
    response.json(items);
});

app.get('/sample/redirect', function(request, response) {
    response.redirect('/sample/text');
});

app.listen(port, function () {
    console.log('listening on port ' + port);
});
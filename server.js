var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.sendFile('index.html', { root: __dirname + '\\public' } );
});

app.use(express.static('public'));

app.get('/sample/text', function(request, response) {
    var text = '<ul><li>a</li><li>b</li><li>c</li></ul>';
    response.send(text);
});

app.get('/sample/json', function(request, response) {
    var items = ['a', 'b', 'c'];
    response.json(items);
});

app.get('/sample/redirect', function(request, response) {
    response.redirect('/sample/text');
});

app.listen(3000, function () {
    console.log('listening on port 3000');
});
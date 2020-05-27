const http = require('http');

const site = http.createServer(function(res,req) {
    console.log('hello World');
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>');
});

site.listen(3000);
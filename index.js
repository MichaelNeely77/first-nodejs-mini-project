const http = require('http');
const data = {
    firstName: 'Michael',
    lastName: 'Neely'
}
const site = http.createServer(function(req, res) {
    console.log('hello World');
    console.log(req.headers);
    console.log(req.url);
    res.setHeader('Content-Type','application/json');
    res.write(JSON.stringify(data));
    res.end();
});

site.listen(3000);
// const http = require('http');
// const fs = require('fs');
// console.log('RESTART');
// const site = http.createServer(function(req, res) {
//     fs.readFile('test.json', function(error, data) {
//         let holder = JSON.parse(data);
//         res.setHeader('Content-Type','application/json');
//         res.write(data);
//         console.log(holder.firstName)
//         res.end();
//     });
    
// });

// site.listen(3000);

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const data = {user: "admin", pass: "password"};

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// app.use(function(req,res,next) {
//     console.log("I'm in the middle");
//     console.log(req.body);
//     next();
// })

app.get('/', function(req, res) {
    
    res.send('<h1>Sup Homeslice</h1>');
});

app.post('/login', function(req, res) {
    if(data.user == req.body.user){
        res.write('{"status":"success"}');
    } else {
        res.write('{"status":"fail"}');
    }
    console.log(req.body.user)
    res.send();

});

app.put('/', function(req, res) {
    res.send('<h1>PUT Sent</h1>');
});


app.delete('/', function(req, res) {
    res.send('<h1>DELETE Sent</h1>');
});



app.listen(3000);
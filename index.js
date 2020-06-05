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

console.log(__dirname);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


// app.use(function(req,res,next) {
//     console.log("I'm in the middle");
//     console.log(req.body);
//     next();
// })

app.get('/users', function(req, res) {
    // see all users
    res.send('<h1>Sup Homeslice</h1>');
});

app.post('/users', function(req, res) {
    // create and add user
    console.log(req.body.user)
    res.send();

});

app.get('/users/:id', function(req, res) {
    // get users info by id
    res.send();
});

app.put('/users/:id', function(req, res) {
    // update users
    console.log(req.params);
    res.send('<h1>PUT Sent</h1>');
});


app.delete('/users/:id', function(req, res) {
    // delete user
    res.send('<h1>DELETE Sent</h1>');
});



app.listen(3000);
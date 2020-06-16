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
const db = require('./helper/datasim.js');
const data = db.data;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/users', function(req, res) {
    // see all users
    res.json(data);
});

app.post('/users', function(req, res) {
    // create and add user
    req.body.id = Math.floor(Date.now());
    data.users.push(req.body);
    res.send('POST sent');

});

app.get('/users/:id', function(req, res) {
    // get users info by id
    res.send(db.getRow(req.params.id));
});

app.put('/users/:id', function(req, res) {
    // update users
    let id = db.findID(data.users, req.params.id);

    if (id != -1) {
        data.users[id] = req.body;
        res.write('updated' + id)
    } else {
        res.write('not found');
    }

    res.send();
    
});


app.delete('/users/:id', function(req, res) {
    // delete user
let id = data.users.indexOf(db.getRow(req.params.id));
if(id != -1) {
    data.users.splice(id, 1);
    res.write('Deleted ' + id)
} else {
    res.write('Not found');
}
    
console.log(data);

    res.send();
});

app.listen(3000);

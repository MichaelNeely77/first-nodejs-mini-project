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

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('testdb', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/users', function(req, res) {
    // see all users
    db.all("SELECT * FROM users", function(err,rows) {
        res.json(rows);
    })
    
});

app.post('/users', function(req, res) {
    // create and add user
    db.run("INSERT INTO users(name,pass)VALUES('"+req.body.name+"','"+req.body.pass+"')", function(err){
        console.log(err);
        res.json({id:this.lastID});
    });
});

app.get('/users/:id', function(req, res) {
    db.all("SELECT * FROM users WHERE id ="+req.params.id, function(err,rows) {
        res.json(rows);
    })
});

app.put('/users/:id', function(req, res) {
    // update users
    db.run("UPDATE users SET name='"+req.body.name+"',pass='"+req.body.pass+"' WHERE id ="+req.params.id, function(err){
        console.log(err);
        res.json({status:this.changes});
    });
    
});


app.delete('/users/:id', function(req, res) {
    // delete user
    db.run("DELETE FROM users WHERE id ="+req.params.id, function(err){
        console.log(err);
        res.json({status:this.changes});
    });
});

app.listen(3000);

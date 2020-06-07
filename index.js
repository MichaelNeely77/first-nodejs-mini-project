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
const data = {"users": [
        {
        "user": "admin1", 
        "pass": "password1",
        "id": 1
        },
        {
        "user": "admin2", 
        "pass": "password2",
        "id": 2
        }
    ]
};

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
    res.json(data);
});

app.post('/users', function(req, res) {
    // create and add user
    req.body.id = data.users.length + 1;
    data.users.push(req.body);
    res.send('POST sent');

});

app.get('/users/:id', function(req, res) {
    console.log(req.params);
    // get users info by id
    res.send(getRow(req.params.id));
});

app.put('/users/:id', function(req, res) {
    // update users
    console.log(req.body);

    req.body.id = req.params.id;
    let temp = data.users.indexOf(getRow(req.params.id));
if(temp != -1) {
    data.users[temp] = req.body;
    res.write('Updated ' + temp)
} else {
    res.write('Not found');
}
    
console.log(data);

    res.send();
    
    res.send('<h1>PUT Sent</h1>' + req.params.id);
});


app.delete('/users/:id', function(req, res) {
    // delete user
let temp = data.users.indexOf(getRow(req.params.id));
if(temp != -1) {
    data.users.splice(temp, 1);
    res.write('Deleted ' + temp)
} else {
    res.write('Not found');
}
    
console.log(data);

    res.send();
});

app.listen(3000);

function getRow(id) {
    for(let item of data.users) {
        if(item.id == id) {
            return item;
        }
        return false;
    }
}
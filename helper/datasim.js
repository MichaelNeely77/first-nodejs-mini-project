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

function getRow(id) {
    for(let item of data.users) {
        if(item.id == id) {
            return item;
        }
        return false;
    }
}

const findID = function(users, id) {
    return users.indexOf(getRow(id));
}

exports.findID = findID;
exports.data = data;
exports.getRow = getRow;


var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    else {
        Todo.findById(id).then((todo) => {
            if(!todo) {
                res.status(404).send();
            }
            else {
                res.send({todo});
            }
        }).catch((err) => {
            res.status(400).send();
        })
    }
});

app.put('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    else {
        Todo.findById(id).then((todo) => {
            if(!todo) {
                res.status(404).send();
            }
            else {
                res.send({todo});
            }
        }).catch((err) => {
            res.status(400).send();
        })
    }
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }).catch((err) => {
        res.status(400).send(err)
    })
});

app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
});

app.listen(port, () => {
    console.log(`started on port ${port}`);
});

module.exports = {app};




var newTodo = new Todo({
     text: '',
    // completed: false,
    // completedAt: 123
});

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unabled to save todo');
// });




var newUser = new User({
    email: 'misc@mikeminer.com'
});

// newUser.save().then((doc) => {
//     console.log('Saved user', doc);
// }, (e) => {
//     console.log('Unabled to save user', e);
// });
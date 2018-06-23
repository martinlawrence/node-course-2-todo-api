const config = require('./config/config.js')
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/user.js');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//GET //todos/:id
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

//DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    else {
        Todo.findByIdAndRemove(id).then((todo) => {
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

//PATCH /todos/:id
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    else {
        if(_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        }
        else {
            body.completed = false;
            body.completedAt = null;
        }

        Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
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

//GET /todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }).catch((err) => {
        res.status(400).send(err)
    })
});

//POST /todos
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

//POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => res.status(400).send(e));
});

app.listen(port, () => {
    console.log(`started on port ${port}`);
});

module.exports = {app};
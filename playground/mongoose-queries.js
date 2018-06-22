const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

var todoId = '5b2d6f801fe5e664464f6d70';
var userId = '5b2d46298fc46f033ecfd05b';

if(!ObjectID.isValid(todoId)) {
    console.log('Id not valid');
}
if(!ObjectID.isValid(userId)) {
    console.log('Id not valid');
}
// Todo.find({
//     _id: todoId
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: todoId
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(todoId).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo', todo);
// }).catch((e) => console.log(e));

User.findById(userId).then((user) => {
    if(!user) {
        return console.log('Id not found');
    }
    console.log('User', user);
}).catch((e) => console.log(e));
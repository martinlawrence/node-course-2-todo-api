const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

var todoId = '5b2d7c1d872eb9eefe00484a';

if(!ObjectID.isValid(todoId)) {
    console.log('Id not valid');
}

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findByIdAndRemove(todoId).then((todo) => {
    console.log(todo);
});

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

// User.findById(userId).then((user) => {
//     if(!user) {
//         return console.log('Id not found');
//     }
//     console.log('User', user);
// }).catch((e) => console.log(e));
var expect = require('expect');
var request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js')
const {Todo} = require('./../models/todo.js');

const todos = [{
    _id: new ObjectID(),
    text: 'first test'
}, {
    _id: new ObjectID(),
    text: 'second test',
    completed: true,
    completedAt: '333'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    expect(todos[2].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create a todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e))
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should delete a todo by id', (done) => {
        var hexId = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return a 404 if todo not found', (done) => {
        request(app)
            .delete(`/todos/6b2d6f801fe5e664464f6d70`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 for non-object ids', (done) => {
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update a todo by id', (done) => {
        var hexId = todos[0]._id.toHexString();
        var textUpdate = 'test text update';
        todos[0].text = textUpdate;
        todos[0].completed = true;
        
        request(app)
            .patch(`/todos/${hexId}`)
            .send(todos[0])
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(textUpdate);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                done();
            });
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        var textUpdate = 'test text update2';
        todos[0].text = textUpdate;
        todos[0].completed = false;
        
        request(app)
            .patch(`/todos/${hexId}`)
            .send(todos[0])
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(textUpdate);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                done();
            });
    });
});
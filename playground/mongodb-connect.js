const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if(error) {
        console.log('Unable to connect to db');
    }
    else {
        console.log('Connected to MongoDB server');

        // db.collection('Todos').insertOne({
        //     text: 'Something to do',
        //     completed: false
        // }, (err, result) => {
        //     if(err) {
        //         console.log('Unable to insert todo', err);
        //     }
        //     else {
        //         console.log(JSON.stringify(result.ops, undefined, 2));
        //     }
        // });

        db.collection('Users').insertOne({
            name: 'Mike',
            age: 36,
            location: 'Orange'
        }, (err, result) => {
            if(err) {
                console.log('Unable to insert todo', err);
            }
            else {
                console.log(result.ops[0]._id.getTimestamp());
            }
        });

        db.close();
    }
});
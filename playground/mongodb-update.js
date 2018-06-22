const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if(error) {
        console.log('Unable to connect to db');
    }
    else {
        console.log('Connected to MongoDB server');

        db.collection('Todos').findOneAndUpdate({
            _id: new ObjectID('5b2d3f02872eb9eefe003ff4')
        }, {
            $set: {
                completed: true
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        });

        //db.close();
    }
});
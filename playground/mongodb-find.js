const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if(error) {
        console.log('Unable to connect to db');
    }
    else {
        console.log('Connected to MongoDB server');

        // db.collection('Todos').find({
        //     _id: new ObjectID('5b2d349e872eb9eefe003d6b')
        // }).toArray().then((docs) => {
        //     console.log('Todos');
        //     console.log(JSON.stringify(docs, undefined, 2));
        // }, (err) => {
        //     console.log('Unable to fetch docs', err);
        // });

        db.collection('Users').find({
                name: 'Mike'
            }).toArray().then((docs) => {
            console.log(`Users`);
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            console.log('Unable to fetch count', err);
        });

        //db.close();
    }
});
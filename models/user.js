const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');

class User {
    
    constructor(username, email) {
        this.name = username;
        this.email = email;
    }

    save() {
        const db = getDb();
        return db
            .collection('users')
            .insertOne(this)
            .then(result => {
                console.log('User created');
            })
            .catch(err => { console.log(err) });
    }

    static findById(userId) {
        const db = getDb();
        return db
            .collection('users')
            .findOne({ _id: new mongodb.ObjectId(userId)});  // utilizando findOne não é necessário chamar next() para acessar o elemento
    }

    static deleteById(userId) {
        const db = getDb();
        return db
            .collection('users')
            .deleteOne({ _id: new mongodb.ObjectId(userId)})
            .then(result => {

            })
            .catch(err => console.log(err));
    }

}

module.exports = User;
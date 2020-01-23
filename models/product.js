const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = mongoose.model('Product', productSchema);

// const getDb = require('../utils/database').getDb;
// const mongodb = require('mongodb');

// class Product {
//     constructor(title, price, imageUrl, description, id, userId) {
//         this.title = title;
//         this.price = price;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userId = userId;
//     }

//     save() {
//         const db = getDb();
//         let dbOp;

//         if (this._id) {
//             dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this});  //updateOne recebe dois argumentos(o filtro para busca e o $set objeto)
//         } else {
//             dbOp = db.collection('products').insertOne(this);
//         }
//         return dbOp
//             .then(result => {
//                 // console.log(result);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     static fetchAll() {
//         const db = getDb();
//         return db
//             .collection('products')
//             .find()                 // pode receber parametros, como está retornará todas instâncias da collection
//             .toArray()      // para trabalhar com as instâncias em formato de array
//             .then(products => {
//                 // console.log(products);
//                 return products;
//             })
//             .catch(err => console.log(err));
//     }

//     static findById(prodId) {
//         const db = getDb();
//         return db
//             .collection('products')
//             .find({_id: new mongodb.ObjectId(prodId)})          //o id no mongodb é gravado como um objeto
//             .next()
//             .then(product => {
//                 return product;
//             })
//             .catch(err => console.log(err));
//     }

//     static deleteById(productId) {
//         const db = getDb();
//         return db
//             .collection('products')
//             .deleteOne({ _id: new mongodb.ObjectId(productId) })
//             .then(result => {
//                 console.log('Deleted');
//             })
//             .catch(err => console.log(err))
//     }

// }

// module.exports = Product;
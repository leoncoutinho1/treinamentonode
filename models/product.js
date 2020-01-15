
const db = require('../utils/database');
const Cart = require('./cart');

module.exports = class Product {
    constructor(id, title, price, imageUrl, description) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    save() {
        return db.execute(
            'INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)', 
            [this.title, this.price, this.description, this.imageUrl]
        );
    }

    static deleteById(id) {
        
    }

    static fetchAll() {
        //the function execute return a promise, the handle will be in the controller of product
        return db.execute('select * from products');
    }

    static findById(id) {
        
    }
}
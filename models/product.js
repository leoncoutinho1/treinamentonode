const products = [];

//para trabalhar com arquivos
const fs = require('fs');

const path = require('path');

const p = path.join(__dirname, '/..', 'public', 'data', 'products.json');

module.exports = class Product {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    save() {
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                callback([]);
            } else {
            callback(JSON.parse(fileContent));
            }
        });
    }
}
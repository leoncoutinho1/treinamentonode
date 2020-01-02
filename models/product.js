
//para trabalhar com arquivos
const fs = require('fs');

const path = require('path');

const Cart = require('./cart');

const p = path.join(__dirname, '/..', 'public', 'data', 'products.json');

//função que recupera os dados do arquivo em formato JSON
//recebe como parametro uma função de callback
const getProductsFromFile = callback => {
    //executa a leitura e após ter concluído executa a função de callback que foi passada
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    constructor(id, title, price, imageUrl, description) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            //encontra o produto selecionado
            const product = products.find(prod => prod.id === id);
            //lista todos os produtos exceto o que foi passado o id
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }

    static fetchAll(callback) {
        //repassa a função de callback que recebeu para ser executada pela função getProductsFromFile
        getProductsFromFile(callback);
    }

    static findById(id, callback) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            callback(product);
        });
    }
}
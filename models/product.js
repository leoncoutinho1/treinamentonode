const products = [];

//para trabalhar com arquivos
const fs = require('fs');

const path = require('path');

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
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        //repassa a função de callback que recebeu para ser executada pela função getProductsFromFile
        getProductsFromFile(callback);
    }
}
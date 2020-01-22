const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');

class User {
    
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;   // {items: []}  o atributo User.cart é um objeto que recebe uma lista de produtos
        this._id = new mongodb.ObjectId(id);
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

    addToCart(product) {
        // caso o produto já esteja no cart será preciso só aumentar a quantidade
        const cartProductIndex = this.cart.items.findIndex(cp => {
            // a comparação cp.productId === product.id não funcionou ambos não são do mesmo tipo
            // a solução é usar dois iguais ou passar ambos para string
            return cp.productId.toString() === product._id.toString(); 
        }) // pega o item do cart que corresponde ao produto

        // cria um array e atribui os itens do cart, se houver
        const updatedCartItems = [...this.cart.items];
        
        let newQuantity = 1;
        // verifica se foi encontrado um item existente no cart 
        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;      // atualiza a quantidade do item encontrado
        } else {
            updatedCartItems.push({
                productId: new mongodb.ObjectId(product._id),
                quantity: newQuantity
            });
        }
        // passa para um objeto tipo Cart
        const updatedCart = {
            items: updatedCartItems
        }
        // grava na instância do usuário
        const db = getDb();
        db.collection('users')
            .updateOne( { _id: this._id }, { $set: {cart: updatedCart} });
    }

    static findById(userId) {
        const db = getDb();
        return db
            .collection('users')
            .findOne({ _id: new mongodb.ObjectId(userId)})
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            });  // utilizando findOne não é necessário chamar next() para acessar o elemento
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
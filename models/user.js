const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{ 
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
});

userSchema.methods.addToCart = function(product) {
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
            productId: product._id,
            quantity: newQuantity
        });
    }
    // passa para um objeto tipo Cart
    const updatedCart = {
        items: updatedCartItems
    }

    this.cart = updatedCart;
    // grava na instância do usuário
    return this.save();
}


userSchema.methods.removefromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter(i => {
        return i.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
}

userSchema.methods.clearCart = function() {
    this.cart = { items: [] };
    return this.save();
}


userSchema.methods.getOrders = function() {
            
//              .find({ 'user._id': new ObjectId(this._id) }).
//              toArray();
}



module.exports = mongoose.model('User', userSchema);
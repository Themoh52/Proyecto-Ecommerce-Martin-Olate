import fs from "fs"


class CartManager{
    constructor(){
        this.path="./db/carts.json";
    }

    async readCarts(){
        try {
          const carts = await fs.promises.readFile(this.path,'utf-8');
        return JSON.parse(carts);  
        } catch (error) {
          throw new error(error.message);  
        }
        
    }

    async writeCarts(carts){
        try {
          await fs.promises.writeFile(this.path,JSON.stringify(carts, null, 2))  
        } catch (error) {
            throw new error(error.message);  
        }
        
    }

    async addCart(product){
        try {
          const carts = await this.readCarts();
        const cart = new Cart({products:[product.id]});
        const checkCartid = carts.find((p) => p.id === cart.id);
        if (checkCartid){
            return ('Carrito no ingresado. El carrito que quisiste crear ya existe.');
        }else{
            if (cart.length) {
            cart.id = carts[carts.length-1].id+1;
            } else {
            cart.id=1;
            }   
        carts.push(cart);
        this.writeCarts(carts);    
        }  
        } catch (error) {
            throw new error(error.message);
        }
        
    }
    

    async getCarts() {
        try {
           const carts = await this.readCarts();
        return carts; 
        } catch (error) {
            throw new error(error.message);
        }
        
      }

    async getCartById(id) {
        try {
            const carts = await this.readCarts();
            const found = carts.find((p) => p.id === id);
            if (found) {
            return found;  
            }else{
            return 'Lo siento, carrito no encontrado'; 
            }   
        } catch (error) {
            throw new error(error.message);
        }
      
    }

    async updateCart(){
        try {
            const carts = await this.getCarts()
            const cart = data.find((cart) => cart.id == id);
            if (cart) {
                const product = cart.products.find((prod) => prod.id == product.id);
                if (product) {
                    product.quantity = product.quantity + 1
                    const index = cart.products.indexOf(product)
                    cart.products.splice(index, 1, product)
                    const indexCart = data.indexOf(cart)
                    data.splice(indexCart, 1, cart)
                    await this.writeCarts(carts);
                } else {
                    cart.products.push({idProduct: product.id, quantity: 1})
                    const indexCart = data.indexOf(cart)
                    data.splice(indexCart, 1, cart)
                    await this.writeCarts(carts);
                }
            } else {
                return ("No existe el carrito");
            } 
        } catch (error) {
            throw new error(error.message);
        }
        
    }

    async removeCart(id){
        try {
            const carts = await this.readCarts();
            const found = carts.find((cart) => cart.id===id)
            if (found) {
                const newCart= carts.filter((cart) => cart.id!==id);
                await this.writeCarts(newCart);
            return ("Carrito eliminado")  
            } else {
            return("No se encuentra el carrito en la BD")
            }  
        } catch (error) {
            throw new error(error.message); 
        }

    }

}

class Cart{    
    constructor(title, description, thumbnail, price, stock, code){
        this.title=title;
        this.description=description;
        this.thumbnail=thumbnail;
        this.price=price;
        this.stock=stock;
        this.code=code;
    if(this.title=="" && this.description=="" &&  this.thumbnail=="" && this.price==NaN && this.stock==NaN && this.code==""){
        throw new Error("No se ingresó el producto. El producto debe tener un nombre, y los precios y stock debe tener datos numéricos.")
    }    
        console.log("Producto ingresado")
    }
}

export default CartManager;
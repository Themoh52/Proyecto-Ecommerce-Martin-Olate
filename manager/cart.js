import fs from "fs"


class CartManager{
    constructor(){
        this.path="./db/carts.json";
    }

    async readCarts(){
        try {
          const products = await fs.promises.readFile(this.path,'utf-8');
        return JSON.parse(products);  
        } catch (error) {
          throw new error(error.message);  
        }
        
    }

    async writeCarts(products){
        try {
          await fs.promises.writeFile(this.path,JSON.stringify(products, null, 2))  
        } catch (error) {
            throw new error(error.message);  
        }
        
    }

    async addCart({title,description,thumbnail,price,stock,code}){
        try {
          const carts = await this.readCarts();
        const cart = new Cart(title,description,thumbnail,price,stock,code);
        const checkCartcode = carts.find((p) => p.code === carts.code);
        if (checkCartcode){
            return ('Carrito no ingresado. El carrito que quisiste crear ya existe.');
        }else{
            if (products.length) {
            product.id = carts[carts.length-1].id+1;
            } else {
            product.id=1;
            }   
        carts.push(cart);
        this.writeCarts(carts);    
        }  
        } catch (error) {
            throw new error(error.message);
        }
        
    }
    

    async getCart() {
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

    async updateCart(updateCart={id,title,description,thumbnail,price,stock,code}){
        try {
          const carts = await this.readCarts();
        carts.map((cart)=>{
            if(cart.id===updateCart.id){
                cart.id = updateCart.id;
                cart.title = updateCart.title;
                cart.description = updateCart.description;
                cart.price = updateCart.price;
                cart.thumbnail = updateCart.thumbnail;
                cart.code = updateCart.code;
                cart.stock = updateCart.stock;
                
                return products;
            }
            else{
                return("producto no encontrado")
            }
        });
        await this.writeCarts(carts);  
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

export default CartManager
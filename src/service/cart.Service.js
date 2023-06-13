import { cartModel } from "../DAO/models/product.model";

export class cartService{

    async getCarts(){
        const cartList = await carts.getCarts()
        if (limit) {
           const showcarts = cartList.slice(0,limit);
           res.status(200).json(showcarts);
        } else {
           res.status(200).json(cartList);
        }   
    }

    async getCartsbyId(){
        const found = await carts.getCartById(parseInt(id));
        if (found) {
           res.status(200).json(found)
        } else {
           res.status(404).send("Lo siento, no encontramos el carrito que buscas.")
        }  
    }


    async postCarts(){
        const data = await carts.getCart();
        await carts.addCart({ products: [] })
    }
    
    async postProductsinCart(){
        const dataCarts = await carts.getCarts()
        const dataProducts = await products.getProducts()
        const cartId = req.params.cid
        const productId = req.params.pid
        const cartFound = dataCarts.find((ele) => ele.id == cartId)
        const productFound = dataProducts.find((ele) => ele.id == parseInt(productId))
        if (cartFound && !productFound) {
         const product = await carts.updateCart(parseInt(cartId), parseInt(productId)) 
        res.status(200).json(product);  
        } else if(cartFound && productFound) {
           
        } else {
            res.status(404).json("No existe ni el carrito y ni el producto en cuestión")
        }  
    }

    async putCarts(){
        const found = await carts.getcartById(parseInt(uid));
        if (found) {
           const update = carts.updatecart(uid);
           res.status(200).json(found);
           return update;   
        } else {
           res.status(404).send("Lo siento, no encontrados el carrito que buscas.")
        }
    }

    async deleteCarts(){
        
    }

}
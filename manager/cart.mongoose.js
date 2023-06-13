import { cartModel } from "../src/DAO/models/cart.model.js";
import { productModel } from "../src/DAO/models/product.model.js";

export class cartsManager{

    async getCarts(limit){
        try {
            return await cartModel.find({}).limit(limit) 
        } catch (error) {
            throw new Error ("No encontramos el carrito que buscas.")
        }
    }

    async getCartsbyId(id){
        try {
            const cart = cartModel.findOne({ _id: id })
            return cart
        } catch (error) {
            throw new Error ("No encontramos el carrito que buscas.")
        }
    }

    async createCart(){
        try {
            return await cartModel.create({});   
        } catch (error) {
            throw new Error ("El carrito ya existe.")
        }
        
    }

    async addToCart(id,pid){
        try {
            const product = await productModel.findOne({ _id: pid }).lean();
            const cart = await cartModel.findOne({ _id: id });
            const productIndex = cart.products.findIndex(item => item.product._id.toString() === pid)
            if (productIndex) {
                cart.products.push({ product: product._id })
                return await cart.save(); 
            } else if(product.stock < cart.products[productIndex].quantity + 1){
                cart.products[productIndex].quantity += 1;
                return await cart.save();
            }
        } catch (error) {
            throw new Error ("No pudimos encontrar el carrito que buscas.")
        }
    }

    async deleteProductinCart(id,pid){
        const cart = await cartModel.findOne({ _id: id })
        const productIndex = cart.products.findIndex(item => item.product._id.toString() === pid)
        if (productIndex === -1){
          cart.products.splice(productIndex, 1)  
        }
        return await cart.save()
    }


    async deleteCart(id){
        try {
            const cart = await cartModel.findOne({ _id: id })
            if (cart) {
                await cartModel.deleteOne({ _id: id })
                return "Se elimino el carrito"
            }
        } catch (error) {
            throw new Error ("No encontramos el carrito que buscas.")
        }
    }

}
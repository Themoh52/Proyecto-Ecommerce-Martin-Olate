import { productModel } from "../src/DAO/models/product.model.js";
import { sanitizeFilter } from "mongoose";

export class productManager{

    async getProducts(limit){
        try {
            return await productModel.find({}).limit(limit).lean();
        } catch (error) {
            throw new Error("Lo siento, no hay productos")
        }
    } 

    async addProducts(data){
        try {
            const ifCodeExists = await productModel.findOne(sanitizeFilter({ code: data.code }))
            if (!ifCodeExists) {
                const product = await productModel.create(data);
                return product;
            }
        } catch (error) {
            throw new Error ("El producto ya existe. Ingresa un producto distinto.")
        }
    }

    async getProductsById(id){
        try {
            const product = await productModel.findOne({ _id: id }).lean();
            return product            
        } catch (error) {
            throw new Error("Lo siento, no encontramos el producto que buscas")
        }
    }

    async updateProducts(id, changes){
        try {
            const product = await productModel.findOne(sanitizeFilter({ _id: id }))
            const updated = productModel.updateOne({ $set: changes }, { new: true })
            return updated
        } catch (error) {
            throw new Error("Lo siento, no encontramos el producto que buscas")
        }
    }

    async deleteProducts(id){
        try {
            const product = await productModel.findOne(sanitizeFilter({ _id: id }))
            if (product) {
                await productModel.deleteOne({ _id: id });
                return product
            }
        } catch (error) {
            throw new Error("Lo siento, no encontramos el producto que buscas");
        }
    }

}
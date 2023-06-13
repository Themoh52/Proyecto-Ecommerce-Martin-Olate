import { productModel } from "../DAO/models/product.model";

export class productService{

    async getProducts(){
        const productList = await products.getProducts()
        if (limit) {
           const showProducts = productList.slice(0,limit);
           res.status(200).json(showProducts);
        } else {
           res.status(200).json(productList);
        }   
    }

    async getProductsbyId(id){
        const found = await products.getProductById(parseInt(id));
        if (found) {
           res.status(200).json(found)
        } else {
           res.status(404).send("Lo siento, no encontramos el producto que buscas.")
        } 
    }

    async postProducts(data){
        if (newProduct.id=="" && allData) {
            newProduct = {...newProduct, id: data[data.length - 1].id + 1};
            await products.addProduct({...newProduct, status:true});
            
         } else {
           res.status(404).send("Lo siento, el producto no fue ingresado"); 
         } 
    } 

    async putProducts(){
        const found = await products.getProductById(parseInt(id));
        if (found) {
           const updateProduct = req.body;
           const update = await products.updateProduct(id, updateProduct);
           
           return update;   
        } else {
           res.status(404).send("Lo siento, no encontrados el producto que buscas.")
        }
    }

    async deleteProducts(){
        const found = await products.getProductById(parseInt(id))
        if (found) {
           const remove = products.removeProduct(rid);
           
        } else {
           res.status(404).send("No se encontró el producto a eliminar")
        }
     
    }

}
import fs from "fs"

class ProductManager{
    constructor(){
        this.path="./db/db.json";
    }

    async readProducts(){
        try {
          const products = await fs.promises.readFile(this.path,'utf-8');
        return JSON.parse(products);  
        } catch (error) {
          throw new error(error.message);  
        }
        
    }

    async writeProducts(products){
        try {
          await fs.promises.writeFile(this.path,JSON.stringify(products, null, 2))  
        } catch (error) {
            throw new error(error.message);  
        }
        
    }

    async addProduct({title,description,thumbnail,price,stock,code}){
        try {
          const products = await this.readProducts();
        const product = new Product(title,description,thumbnail,price,stock,code);
        const checkProductcode = products.find((p) => p.code === product.code);
        if (checkProductcode){
            console.log('Producto no ingresado. El producto que quisiste ingresar ya existe.');
            return ('Producto no ingresado. El producto que quisiste ingresar ya existe.');
        }else{
            if (products.length) {
            product.id = products[products.length-1].id+1;
            } else {
            product.id=1;
            }   
        products.push(product);
        this.writeProducts(products);    
        }  
        } catch (error) {
            throw new error(error.message);
        }
        
    }
    

    async getProducts() {
        try {
           const products = await this.readProducts();
        return products; 
        } catch (error) {
            throw new error(error.message);
        }
        
      }

    async getProductById(id) {
        try {
            const products = await this.readProducts();
            const found = products.find((p) => p.id === id);
            if (found) {
            return found;  
            }else{
            return 'Lo siento, producto no encontrado'; 
            }   
        } catch (error) {
            throw new error(error.message);
        }
      
    }

    async updateProduct(updateProduct={id,title,description,thumbnail,price,stock,code}){
        try {
          const products = await this.readProducts();
        products.map((product)=>{
            if(product.id===updateProduct.id){
                product.id = updateProduct.id;
                product.title = updateProduct.title;
                product.description = updateProduct.description;
                product.price = updateProduct.price;
                product.thumbnail = updateProduct.thumbnail;
                product.code = updateProduct.code;
                product.stock = updateProduct.stock;
                console.log("Producto modificado")
                return products;
            }
            else{
                console.log("producto no encontrado")
            }
        });
        await this.writeProducts(products);  
        } catch (error) {
            throw new error(error.message);
        }
        
    }

    async removeProduct(id){
        try {
            const products = await this.readProducts();
            const found = products.find((product) => product.id===id)
            if (found) {
                const newProduct= products.filter((product) => product.id!==id);
                console.log("Producto eliminado");
                await this.writeProducts(newProduct);
            return   
            } else {
            console.log("No se encuentra el producto en la BD")
            }  
        } catch (error) {
            throw new error(error.message); 
        }

    }
    
}

class Product{    
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

const productManager = new ProductManager();

export default ProductManager



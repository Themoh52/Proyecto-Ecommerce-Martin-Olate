import express from express;
import ProductManager from "../manager/product.js";

const productRouter = express.Router();

const products = new ProductManager();

productRouter.get('api/products/',async (req,res)=>{
   const limit = req.query.limit;
   const productList = await products.getProducts()
   if (limit) {
      const showProducts = productList.slice(0,limit);
      res.status(200).json(showProducts);
   } else {
      res.status(200).json(productList);
   }   
   });

productRouter.get("api/products/:id",async (req,res)=>{
   const id = req.params.id;
   const found = await products.getProductById(parseInt(id));
   if (found) {
      res.status(200).json(found)
   } else {
      res.status(404).send("Lo siento, no encontramos el producto que buscas.")
   }   
});

productRouter.post("api/products/new",async (req,res)=>{
   let newProduct = req.body;
   const requiredData = ["title", "description", "code", "price", "stock", "category"];
   const allData = requiredData.every(prop => newProduct[prop]);
   if (newProduct.id=="" && allData) {
      newProduct = {...newProduct, id: data[data.length - 1].id + 1};
      await products.addProduct({...newProduct, status:true});
      return res.status(200).json({
         status: "Exito",
         message: "El producto se ha creado con éxito",
         data: newProduct 
      });
   } else {
     res.status(404).send("Lo siento, el producto no fue ingresado"); 
   } 
});

productRouter.put("api/products/:uid",async (req,res)=>{
   const id = req.params.uid;
   const found = await products.getProductById(parseInt(id));
   if (found) {
      const updateProduct = req.body;
      const update = await products.updateProduct(id, updateProduct);
      res.status(200).json(update);
      return update;   
   } else {
      res.status(404).send("Lo siento, no encontrados el producto que buscas.")
   }
});

productRouter.delete("api/products/:rid",async (req,res)=>{
   const id = req.params.rid;
   const found = await products.getProductById(parseInt(id))
   if (found) {
      const remove = products.removeProduct(rid);
      res.status(200).send("Producto eliminado");
   } else {
      res.status(404).send("No se encontró el producto a eliminar")
   }

});

export default productRouter


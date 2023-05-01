
import express from "express";
import productManager from "../manager/product.js";

const products = new productManager();
const app = express();

const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/products/',async (req,res)=>{
   const limit = req.query.limit;
   const productList = await products.getProducts()
   if (limit) {
      const showProducts = productList.slice(0,limit);
      res.status(200).json(showProducts);
   } else {
      res.status(200).json(productList);
   }   
  });

app.get("/products/:id",async (req,res)=>{
 const id = req.params.id;
 const found = await products.getProductById(parseInt(id));
 if (found) {
   res.status(200).json(found)
 } else {
   res.status(404).send("Lo siento, no encontramos el producto que buscas.")
 }   
});

app.listen(port,()=>{
    console.log(`Servidor conectado en el puerto ${port}`)
})




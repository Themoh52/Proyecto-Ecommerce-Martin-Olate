import  Express  from "express";
import { productManager } from "../../manager/product.mongoose.js";

const productRouter = Express.Router();

const service = new productManager();

productRouter.get('api/products/',async (req,res)=>{
   const limit = req.query.limit;
   const showProducts = await service.getProducts(limit); 
   res.status(200).json(showProducts);
   });

productRouter.get("api/products/:id",async (req,res)=>{
   const id = req.params;
   found = await service.getProductsbyId(id);
   return res.status(200).json({
      success: true,
      payload: found
    })
});

productRouter.post("api/products/new",async (req,res)=>{
   const newProduct = await service.postProducts(req.body);
   return res.status(200).json({
      status: true,
      message: "El producto se ha creado con éxito",
      data: newProduct 
   });

});

productRouter.put("api/products/:id",async (req,res)=>{
   const id = req.params.uid;
   updateProduct = service.putProducts(id,req.body)
   return res.status(200).json({
      status: true,
      message: "El producto se ha actualizado con éxito",
      data: updateProduct 
   });
});

productRouter.delete("api/products/:id",async (req,res)=>{
   const id = req.params.rid;
   const remove = service.deleteProducts(id)
   return res.status(200).json({
      status: true,
      message: "El producto se ha eliminado con éxito",
      data: remove 
   });
});

export default productRouter


import  Express  from "express";
import { cartsManager } from "../../manager/cart.mongoose.js";

const cartRouter = Express.Router();

const service = new cartsManager();

cartRouter.get('api/carts/',async (req,res)=>{
   const limit = req.query;
   const getCart = await service.getCarts(limit);
   return res.status(200).json({
      success: true,
      payload: getCart
    }) 
   });

cartRouter.get("api/carts/:id",async (req,res)=>{
   const id = req.params.id;
   const cart = await service.getCartsbyId(id);
   return res.status(200).json({
      status: true,
      message: "Carrito encontrado",
      data: cart 
   });
   
});

cartRouter.post("api/carts/create",async (req,res)=>{
   const cart = await service.createCart()
   return res.status(200).json({
      status: true,
      message: "Carrito creado con éxito",
      data: cart 
   });   
});

cartRouter.post("api/carts/:id/:pid",async (req,res)=>{
   const {id,pid} = req.params
   const add = service.addToCart(id,pid);
   return res.status(200).json({
      status: true,
      message: "Se ha agregado el producto al carrito.",
      data: add 
   });
});

cartRouter.delete("api/carts/:id",async (req,res)=>{
   const id = req.params.rid;
   const remove = service.deleteCart(id)
   return res.status(200).json({
      status: true,
      message: "Carrito eliminado.",
      data: remove 
   });
});

export default cartRouter


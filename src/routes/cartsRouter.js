import express from express;
import CartManager from "../manager/cart.js";

const cartRouter = express.Router();

const carts = new CartManager();

cartRouter.get('api/carts/',async (req,res)=>{
   const limit = req.query.limit;
   const cartList = await carts.getcarts()
   if (limit) {
      const showcarts = cartList.slice(0,limit);
      res.status(200).json(showcarts);
   } else {
      res.status(200).json(cartList);
   }   
   });

cartRouter.get("api/carts/:id",async (req,res)=>{
   const id = req.params.id;
   const found = await carts.getcartById(parseInt(id));
   if (found) {
      res.status(200).json(found)
   } else {
      res.status(404).send("Lo siento, no encontramos el carrito que buscas.")
   }   
});

cartRouter.post("api/carts/new",async (req,res)=>{
    
});

cartRouter.put("api/carts/:uid",async (req,res)=>{
   const uid = req.params.uid;
   const found = await carts.getcartById(parseInt(uid));
   if (found) {
      const update = carts.updatecart(uid);
      res.status(200).json(found);
      return update;   
   } else {
      res.status(404).send("Lo siento, no encontrados el carrito que buscas.")
   }
});

cartRouter.delete("api/carts/:rid",async (req,res)=>{
   const rid = req.params.rid;
   const remove = carts.removecart(rid);
   if (remove) {
      res.status(200).send("carto eliminado");
   } else {
      res.status(404).send("No se encontró el carrito a eliminar")
   }

});

export default cartRouter


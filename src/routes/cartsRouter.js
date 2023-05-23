import  Express  from "express";
import CartManager from "../../manager/cart.js";
import ProductManager from "../../manager/product.js";

const cartRouter = Express.Router();

const carts = new CartManager();
const products = new ProductManager();

cartRouter.get('api/carts/',async (req,res)=>{
   const limit = req.query.limit;
   const cartList = await carts.getCarts()
   if (limit) {
      const showcarts = cartList.slice(0,limit);
      res.status(200).json(showcarts);
   } else {
      res.status(200).json(cartList);
   }   
   });

cartRouter.get("api/carts/:id",async (req,res)=>{
   const id = req.params.id;
   const found = await carts.getCartById(parseInt(id));
   if (found) {
      res.status(200).json(found)
   } else {
      res.status(404).send("Lo siento, no encontramos el carrito que buscas.")
   }   
});

cartRouter.post("api/carts/create",async (req,res)=>{
   const data = await carts.getCart();
   await carts.addCart({ products: [] })
   res.status(200).json(data)    
});

cartRouter.post("api/carts/:cid/:pid",async (req,res)=>{
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
      res.status(200).send("carrito eliminado");
   } else {
      res.status(404).send("No se encontró el carrito a eliminar")
   }

});

export default cartRouter


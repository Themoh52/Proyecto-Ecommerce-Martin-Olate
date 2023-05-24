
import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartsRouter.js";
import webRouter from "./routes/webRouter.js";
import handlebars from "express-handlebars";
import path from "path"
import { __dirname } from "./utils.js";
import  {Server}  from "socket.io";
import ProductManager from "../manager/product.js";

const app = express();
;

const port = 8080;

////
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

////
app.engine("handlebars", handlebars.engine());
app.set("views engine","handlebars");
app.set("views", path.join(__dirname, "views"))

app.use("/api/products",productRouter);
app.use("/api/carts", cartRouter);
app.use("/",webRouter)


const server = app.listen(port,()=>{
    console.log(`Servidor conectado en el puerto ${port}`)
})

const io = new Server(server);

io.on('connection', async (socket)=>{

    const products = new ProductManager()
    console.log("Nuevo usuario conectado")
    const product = await products.readProducts();
    io.sockets.emit('update', product);

    socket.on('NewProduct', async (newProduct)=>{
        await products.addProduct(newProduct);
        const products = await products.readProducts();
        io.sockets.emit('update', products)
    })

    socket.on('showProducts', () =>{
        io.sockets.emit('update', products.getProducts())
    })

})

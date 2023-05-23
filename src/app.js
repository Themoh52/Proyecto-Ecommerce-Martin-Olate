
import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartsRouter.js";
import webRouter from "./routes/webRouter.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

const app = express();


const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.engine("handlebars", handlebars.engine());
app.set("views engine","handlebars");

app.use("/api/products",productRouter);
app.use("/api/carts", cartRouter);
app.use("/book",webRouter)


const server = app.listen(port,()=>{
    console.log(`Servidor conectado en el puerto ${port}`)
})

const io = new Server(server);

io.on('connection', async (socket)=>{

    console.log("Nuevo usuario conectado")
    const products = await products.readProducts();
    io.sockets.emit('update', products)
    io.sockets.emit('message', "Saludos, soy Prueba1, y ahora te presentamos el espacio para agregar productos a nuestra Base de Datos");

    socket.on('NewProduct', async (newProduct)=>{
        await products.addProduct(newProduct);
        const products = await products.readProducts();
        io.sockets.emit('update', products)
    })

    socket.on('showProducts', () =>{
        io.sockets.emit('update', products.getProducts())
    })

})

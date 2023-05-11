
import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartsRouter.js";
import handlebars from "express-handlebars";
import Server from "socket.io";

const app = express();


const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.engine("handlebars", handlebars.engine());
app.set("views engine","handlebars");

app.use("/api/products",productRouter);
app.use("/api/carts", cartRouter);



app.listen(port,()=>{
    console.log(`Servidor conectado en el puerto ${port}`)
})




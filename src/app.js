
import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartsRouter.js";
import webRouter from "./routes/webRouter.js";
import { usersRouter } from "./routes/userRouter.js";
import handlebars from "express-handlebars";
import path from "path"
import { __dirname, connecSocket, connectMongo } from "./utils.js";


const app = express();

connectMongo();

const port = 8080;

const server = app.listen(port,()=>{
    console.log(`Servidor conectado en el puerto ${port}`)
})
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
app.use("api/users", usersRouter)
app.use("/",webRouter);




connecSocket(server);




import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartsRouter.js";
import webRouter from "./routes/webRouter.js";
import usersRouter from "./routes/userRouter.js";
import authRouter from "./routes/authrouter.js";
import viewsRouter from "./routes/viewsrouter.js"
import sessionsRouter from "./routes/sessionsrouter.js"
import handlebars from "express-handlebars";
import path from "path"
import { __dirname, connecSocket, connectMongo} from "./utils.js";
import session from "express-session";
import Mongostore from "connect-mongo";
import passport from "passport";
import { iniPassport } from "./config/passportConfig.js";


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
//app.use(cookieParser("secret code:dasdanodis5345611"));//

////
app.engine("handlebars", handlebars.engine());
app.set("views engine","handlebars");
app.set("views", path.join(__dirname, "views"))


iniPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products",productRouter);
app.use("/api/carts", cartRouter);
app.use("api/users", usersRouter)
app.use("/auth", authRouter);
app.use("/sessions", sessionsRouter)
app.use("/views",viewsRouter)
app.use("/",webRouter);
app.use(
  session({
    store: Mongostore.create({mongoUrl:"mongodb+srv://themolate:dNSElAW8TSywkJzR@bdcapibara.hmy7xqf.mongodb.net/?retryWrites=true&w=majority", ttl:7200}),
    secret:'Im Batman!!',
    resave:true,
    saveUninitialized:true
  })
)
   
app.get('/api/show-session', (req, res) => {
    return res.send(JSON.stringify(req.session))
   })

connecSocket(server);



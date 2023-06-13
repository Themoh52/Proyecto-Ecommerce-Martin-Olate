import { UserModel } from "./DAO/models/user.model.js";


//--multer--//
import multer from "multer";

//--dirname--//
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "/public");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  export const uploader = multer({ storage });

// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//--Mongoose--//
import { connect } from "mongoose";
export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://themolate:dNSElAW8TSywkJzR@bdcapibara.hmy7xqf.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}

//----//
let res = await UserModel.find({lastname:"Olate"}.explain("executionStats"));


//--Socket--//
import  {Server}  from "socket.io";
import { UserModel } from "./DAO/models/user.model";
export async function connecSocket(server){
  const io = new Server(server);
  let msgs = [];
  
  io.on('connection', async (socket)=>{
  
      io.on("msg_front_to_back", (msg)=>{
          msgs.unshift(msg);
          io.emit("msg_back_to_front", msgs);
      })
  
      const products = new ProductManager()
      console.log("Nuevo usuario conectado")
      const product = await products.readProducts();
      io.emit('update', product);
  
      socket.on('NewProduct', async (newProduct)=>{
          await products.addProduct(newProduct);
          const products = await products.readProducts();
          io.emit('update', products)
      })
  
      socket.on('showProducts', () =>{
          io.emit('update', products.getProducts())
      })
  
  })
}


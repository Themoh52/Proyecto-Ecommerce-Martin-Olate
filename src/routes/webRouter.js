import  Express  from "express";

const webRouter = Express.Router();



webRouter.get('/index',async (req,res)=>{
  res.status(200).render("./layouts/main.handlebars") 
   });


export default webRouter
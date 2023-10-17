import express from "express";

const viewsRouter = express.Router();

viewsRouter.get("/", async(req,res)=>{
    res.render("home")
})

viewsRouter.get("/login", async(req,res)=>{
    res.render("login-github")
})

export default viewsRouter
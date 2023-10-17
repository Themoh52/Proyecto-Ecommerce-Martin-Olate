import express from "express";

const sessionsRouter = express.Router();

sessionsRouter.get("/", async(req,res)=>{
    res.render("home")
})

sessionsRouter.get("/login", async(req,res)=>{
    res.render("login-github")
})

export default sessionsRouter
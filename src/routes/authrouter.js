import Express  from "express";
import { UserModel } from "../DAO/models/user.model.js";
import { isUser , isAdmin} from "../middlewares/auth.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const authRouter = Express.Router();


authRouter.get("/perfil", isUser, (req, res, next) => {
  const user = {email:req.session.email, isAdmin:req.session.isAdmin};
  req.session.name=user.firstName;
  return res.render("login",{user:user})

});

authRouter.get("/administrador", isUser, isAdmin, (req, res, next) => {
  const user = {email:req.session.email, isAdmin:req.session.isAdmin};
  req.session.name=user.firstName;
  return res.render("login",{user:user})

});

authRouter.get("/logout", async (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).render("error",{error:"Algo salió mal"})
    }
    return res.redirect("/auth/login")
  })

});

authRouter.post("/login", async (req, res, next) => {
  const {email,password}=req.body;
  if (!email || !password) {
    return res.status(400).render("error",{error:"Ingrese tanto el correo como la contraseña"})
  }
  const userFinded = await UserModel.findOne({email:email});
  if(userFinded && isValidPassword(password, userFinded.password)){
    req.session.email=userFinded.email;
    req.session.isAdmin=userFinded.isAdmin;
    return res.redirect("/auth/perfil");
  }else{
    return res.status(401).render("error",{error:"Lo senstimos, pero el usuario o la contraseña no son correctos"})
  }

});
  
authRouter.get("/register", async (req, res) => {
    return res.render("register",{})
  
});
  
authRouter.post("/register", async (req, res, next) => {
  const {email,password,firstName,lastName}=req.body;
  if (!email || !password || !firstName ||!lastName) {
    return res.status(400).render("error",{error:"Ingrese todos los datos mencionados en el formulario"})
  }
  try {
    const userCreated = await UserModel.create({email:email,pass:createHash(password),firstName:firstName,lastName:lastName, isAdmin:false});
    req.session.email=userCreated.email;
    req.session.isAdmin=userCreated.isAdmin=false;
    return res.redirect("/auth/perfil");
  } catch (error) {
    return res.status(400).render("error",{error:"No se pudo crear el usuario. Pruebe con otro mail"})
  }

});

authRouter.post("/register", passport.authenticate("register",{failureRedirect:"auth/failregister"}), (req, res, next) => {
  if (!req.user) {
    return res.jason({error:"Algo salió mal"})
  }
  req.session.user={_id:req.user._id, email:req.user.email, firstName:req.user.firstName,lastName:req.user.lastName, isAdmin:false}
});

authRouter.get("/failregister",async (req,res)=>{
  return res.json({error:"Fallo en el registro de tu usuario"})
})

export default authRouter
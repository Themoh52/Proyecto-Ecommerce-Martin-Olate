import passport from "passport";
import local from "passport-local"
import GitHubStrategy from "passport-github2"
import { createHash, isValidPassword } from "../utils.js";
import { UserModel } from "../DAO/models/user.model.js";



export function iniPassport(){
    
    passport.use(
        'github',
        new GitHubStrategy(
          {
            clientID: 'Iv1.249dfd96ca09d613',
            clientSecret: '830008ffad121729d4120310fb1e999c31f7480a',
            callbackURL: 'https://localhost:8080/',
          },
          async (accesToken, _, profile, done) => {
            try {
              /*const res = await fetch('https://api.github.com/user/emails', {
                headers: {
                  Accept: 'application/vnd.github+json',
                  Authorization: 'Bearer ' + accesToken,
                  'X-Github-Api-Version': '2022-11-28',
                },
              });
              const emails = await res.json();
              const emailDetail = emails.find((email) => email.verified == true);
    
              if (!emailDetail) {
                return done(new Error('cannot get a valid email for this user'));
              }
              profile.email = emailDetail.email;*/
    
              let user = await UserModel.findOne({ email: profile.email });
              if (!user) {
                const newUser = {
                  email: profile.email,
                  firstName: profile._json.name || profile._json.login || 'noname',
                  lastName: 'nolast',
                  isAdmin: false,
                  password: 'nopass',
                };
                let userCreated = await UserModel.create(newUser);
                console.log('User Registration succesful');
                return done(null, userCreated);
              } else {
                console.log('User already exists');
                return done(null, user);
              }
            } catch (e) {
              console.log('Error en auth github');
              console.log(e);
              return done(e);
            }
          }
        )
      );
    

    /*passport.use("login", new localStrategy({usernameField:"email"}, async(username, password, done)=>{
        try {
            const user = await UserModel.findOne({email:username});
            if (!user) {
                console.log("Usuario no encontrado mediante el correo" + username)
                return done(null,false);
            }
            if (!isValidPassword(password, user.password)) {
                console.log();
                return done(null,false);
            }
            return done(null,false);

        } catch (err) {
            return done(err)
        }
    }))*/



    /*passport.use("register", new localStrategy({passReqToCallback:true, usernameField:"email"}, async(req, username,password,done)=>{
        try {
            const {email,firstName,lastName} =req.body;
            let user = await UserModel.findOne({email:username});
            if (user) {
                console.log("El usuario ya existe");
                return done (null,false);
            }
            const newUser={email,firstName,lastName,isAdmin:false,password:createHash(password),};
            let userCreated = await UserModel.create(newUser);
            console.log(userCreated);
            console.log("El usuario fue creado satisfactoriamente");
            return done(null,userCreated)
        } catch (err) {
            console.log("Error al momento de crear el usuario");
            console.log(err);
            return done (err);
        }
    }))*/

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser(async(_id,done)=>{
        let user = await UserModel.findById(id);
        done(null,user);
    })
}


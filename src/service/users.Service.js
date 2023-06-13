import { UserModel } from "../DAO/models/user.model.js";


export class userService{

  async getUsers(){
    const users = await UserModel.find({});
    return users
  }

   validateUsers(firstName, lastName, email){
    if (!firstName || !lastName || !email) {
        console.log(
          "validation error: please complete firstName, lastname and email."
        );
        throw new Error ("validation error: please complete firstName, lastname and email.") 
        /*return res.status(400).json({
          status: "error",
          msg: "please complete firstName, lastname and email.",
          data: {},
        });*/
      }

  }

  async postUsers(firstName, lastName, email){
      userService.validateUsers(firstName, lastName, email);
      const userCreated = await UserModel.create({ firstName, lastName, email });
      return userCreated
  }

  async deleteUsers(_id){
    const deleted = await UserModel.deleteOne({ _id: id });
    return deleted
  }

  async putUsers(_id, firstName, lastName, email){
    if(!_id) throw new Error ("Falta el id")
    userService.validateUsers(firstName, lastName, email);
      const userUptaded = await UserModel.updateOne({ _id: id },{ firstName, lastName, email }
      );
      return userUptaded
      /*return res.status(201).json({
        status: "success",
        msg: "user uptaded",
        data: userUptaded,
      });*/
  }

}


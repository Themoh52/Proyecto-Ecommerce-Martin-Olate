import { Router } from "express";
import { userService } from "../service/users.Service.js";

export const usersRouter = Express.Router;

const service = new userService();

usersRouter.get("/", async (req, res) => {
    try {
      const users = await service.getUsers();
      return res.status(200).json({
        status: "success",
        msg: "listado de usuarios",
        data: users,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  });
  
  usersRouter.post("/", async (req, res) => {
    const { firstName, lastName, email } = req.body;
    try {
      const users = await service.postUsers(firstName, lastName, email);
      return res.status(201).json({
        status: "success",
        msg: "user created",
        data: userCreated,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  });
  
  usersRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    try {
      const users = await service.putUsers(id,firstName, lastName, email); 
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  });

  usersRouter.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const users = await service.deleteUsers(id);
      return res.status(200).json({
        status: "success",
        msg: "user deleted",
        data: {},
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  });
  
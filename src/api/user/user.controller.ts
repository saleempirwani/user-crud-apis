import express from "express";
import { validateDto } from "../../middleware/validator";
import { createUserDto, updateUserDto } from "./user.dto";
import {
  createUser,
  getAllUsers,
  getUserById,
  removeUser,
  updateUser,
} from "./user.service";
import { userAuth } from "../../middleware/validator/user-auth";

const router = express.Router();

router
  .post("/create", userAuth, validateDto(createUserDto), createUser)
  .get("/all/", userAuth, getAllUsers)
  .patch("/update/:user_id", userAuth, validateDto(updateUserDto), updateUser)
  .delete("/delete/:user_id", userAuth, removeUser)
  .get("/details/:user_id", userAuth, getUserById);

module.exports = router;

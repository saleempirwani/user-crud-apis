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
  .patch("/update/:userId", userAuth, validateDto(updateUserDto), updateUser)
  .delete("/delete/:userId", userAuth, removeUser)
  .get("/all/", userAuth, getAllUsers)
  .get("/details/:userId", userAuth, getUserById);

module.exports = router;

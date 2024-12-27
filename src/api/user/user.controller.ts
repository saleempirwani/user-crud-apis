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
  .get("/all", userAuth, getAllUsers)
  .patch("/update", userAuth, validateDto(updateUserDto), updateUser)
  .delete("/delete", userAuth, removeUser)
  .get("/details", userAuth, getUserById);

module.exports = router;

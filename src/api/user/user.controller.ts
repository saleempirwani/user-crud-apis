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

const router = express.Router();

router
  .post("/create", validateDto(createUserDto), createUser)
  .patch("/update/:userId", validateDto(updateUserDto), updateUser)
  .delete("/delete/:userId", removeUser)
  .get("/all/", getAllUsers)
  .get("/details/:userId", getUserById);

module.exports = router;

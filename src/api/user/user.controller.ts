import express from "express";
import { validateDto } from "../../middleware/validator";
import { updateUserDto } from "./user.dto";
import {
  createUser,
  getAllUsersByRole,
  removeUser,
  updateUser,
} from "./user.service";

const router = express.Router();

router
  .post("/create", validateDto(updateUserDto), createUser)
  .patch("/update", validateDto(updateUserDto), updateUser)
  .delete("/delete", removeUser)
  .get("/all/:role", getAllUsersByRole);

module.exports = router;

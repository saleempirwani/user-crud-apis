import express from "express";
import { userAuth } from "../../middleware/auth/user-auth";
import { validateDto } from "../../middleware/validator";
import { userFileUpload } from "../../utils/multer-file-upload";
import { updateUserDto } from "./user.dto";
import { getUser, removeUser, updateUser } from "./user.service";

const router = express.Router();

router
  .get("/me", userAuth, getUser)
  .patch(
    "/update-profile",
    userAuth,
    userFileUpload,
    validateDto(updateUserDto),
    updateUser
  )
  .delete("/", userAuth, removeUser);

module.exports = router;

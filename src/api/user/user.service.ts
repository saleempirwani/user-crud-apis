import express from "express";
import { ERRORS } from "../../messages/errors";
import { STATUS } from "../../messages/status-codes";
import { SUCCESS } from "../../messages/success";
import { errorLogs } from "../../utils/error";
import { paginate } from "../../utils/pagination";
import { CreateUserDtoType } from "./user.dto";
import { User } from "./user.model";

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { username, email, user_id } = req.body as CreateUserDtoType;

    const userIdExist = await User.findOne({ user_id });

    if (userIdExist)
      return res
        .status(STATUS.badRequest)
        .send({ message: "user_id is already exist." });

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user)
      return res
        .status(STATUS.badRequest)
        .send({ message: "Email or username is already exist." });

    const data = await new User(req.body).save();
    return res
      .status(STATUS.created)
      .send({ data: data, message: SUCCESS.created });
  } catch (error: any | unknown) {
    errorLogs("createUser", error);
    return res
      .status(STATUS.server)
      .send({ error: error.message, message: ERRORS.server_error });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { user_id } = req.query;

    if (!user_id)
      return res
        .status(STATUS.badRequest)
        .send({ message: "Please provide user_id" });

    const user = await User.findOne({ user_id });

    if (!user)
      return res.status(STATUS.notFound).send({ message: ERRORS.notFound });

    Object.keys(req.body).forEach((key) => {
      (user as any)[key] = req.body[key];
    });

    const data = await user.save();

    return res.send({
      data,
      message: SUCCESS.updated,
    });
  } catch (error: any | unknown) {
    errorLogs("updateUser", error);
    return res
      .status(STATUS.server)
      .send({ error: error.message, message: ERRORS.server_error });
  }
};

export const removeUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { user_id } = req.query;

    if (!user_id)
      return res
        .status(STATUS.badRequest)
        .send({ message: "Please provide user_id" });

    const user = await User.findOne({ user_id });

    if (!user)
      return res.status(STATUS.notFound).send({ message: ERRORS.notFound });

    await User.findByIdAndDelete(user._id);

    return res
      .status(STATUS.success)
      .send({ data: { _id: user_id }, message: SUCCESS.deleted });
  } catch (error: any | unknown) {
    errorLogs("remove_user", error);
    return res
      .status(STATUS.server)
      .send({ error: error.message, message: ERRORS.server_error });
  }
};

export const getUserById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { user_id } = req.query;

    if (!user_id)
      return res
        .status(STATUS.badRequest)
        .send({ message: "Please provide user_id" });

    const user = await User.findOne({ user_id });

    if (!user)
      return res.status(STATUS.notFound).send({ message: ERRORS.notFound });

    return res.status(STATUS.success).send({
      data: user,
      message: SUCCESS.fetched,
    });
  } catch (error: any | unknown) {
    errorLogs("getUserById", error);
    return res
      .status(STATUS.server)
      .send({ error: error.message, message: ERRORS.server_error });
  }
};

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { search, email, role, username, user_id } = req.query;

    const data = await paginate({
      pagination: req.query,
      filter: {
        ...(email && {
          email,
        }),

        ...(username && {
          username,
        }),

        ...(role && {
          role,
        }),

        ...(user_id && {
          user_id: user_id,
        }),

        ...(search && {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
          ],
        }),
      },
      model: User,
    });

    return res.status(STATUS.success).send({
      ...data,
      message: SUCCESS.fetched,
    });
  } catch (error: any | unknown) {
    errorLogs("getAllUsers", error);
    return res
      .status(STATUS.server)
      .send({ error: error.message, message: ERRORS.server_error });
  }
};

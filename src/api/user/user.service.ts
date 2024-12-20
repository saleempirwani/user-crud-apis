import express from "express";
import { ERRORS } from "../../messages/errors";
import { STATUS } from "../../messages/status-codes";
import { SUCCESS } from "../../messages/success";
import { errorLogs } from "../../utils/error";
import { paginate } from "../../utils/pagination";
import { Role } from "./user.interface";
import { User } from "./user.model";

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const data = new User(req.body).save();
    res.status(STATUS.created).send({ data: data, message: SUCCESS.created });
  } catch (error: any | unknown) {
    errorLogs("createUser", error);
    res
      .status(STATUS.server)
      .send({ error: error.message, message: ERRORS.server_error });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = await User.findById(req.params?.userId);
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
    const userId = req.params?.userId;
    const user = await User.findById(userId);

    if (!user)
      return res.status(STATUS.notFound).send({ message: ERRORS.notFound });

    await User.findByIdAndDelete(userId);

    return res
      .status(STATUS.success)
      .send({ data: { _id: userId }, message: SUCCESS.deleted });
  } catch (error: any | unknown) {
    errorLogs("remove_user", error);
    return res
      .status(STATUS.server)
      .send({ error: error.message, message: ERRORS.server_error });
  }
};

export const getAllUsersRole = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { role, search } = req.query;

    if (!Object.values(Role).includes(role as Role))
      return res.status(STATUS.badRequest).send({
        message: "Invalid role",
      });

    const data = await paginate({
      pagination: req.query,
      filter: {
        role,
        ...(search && {
          $or: [{ fullName: { $regex: search, $options: "i" } }],
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

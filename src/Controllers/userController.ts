import { db } from "../Models";
import { sendSuccess, sendError } from "./../Utils/helpers.ts";

export const getUser = async (req: any, res: any) => {
  try {
    const user = db.Users.findOne({ where: { id: req.params.id } });
    sendSuccess(res, user);
  } catch (error) {
    sendError(res, error);
  }
};

export const createUser = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;
    const user = db.Users.create({ name, email, password });
    sendSuccess(res, user);
  } catch (error) {
    sendError(res, error);
  }
};

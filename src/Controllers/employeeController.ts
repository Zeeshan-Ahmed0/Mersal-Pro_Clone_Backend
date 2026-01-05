import { db } from "../Models";
import { sendSuccess, sendError } from "./../Utils/helpers.ts";

export const getEmployee = async (req: any, res: any) => {
  try {
    const employee = db.Employees.findOne({ where: { id: req.params.id } });
    sendSuccess(res, employee);
  } catch (error) {
    sendError(res, error);
  }
};

export const getAllEmployees = async (req: any, res: any) => {
  try {
    const employees = db.Employees.findAll();
    sendSuccess(res, employees);
  } catch (error) {
    sendError(res, error);
  }
};

export const createEmployee = async (req: any, res: any) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      role,
      status,
      address,
      latitude,
      longitude,
    } = req.body;
    const employee = db.Employees.create({
      name,
      email,
      password,
      phone,
      role,
      status,
      address,
      latitude,
      longitude,
    });
    sendSuccess(res, employee);
  } catch (error) {
    sendError(res, error);
  }
};

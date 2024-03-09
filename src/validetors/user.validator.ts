import { userRolesEnum } from "./../interfaces/user";
import Joi from "joi";
import { Types } from "mongoose";

const validateObgetId = (value: any, helper: any) => {
  return Types.ObjectId.isValid(value)
    ? value
    : helper.message("In-valed objectId");
};

export const loginValidationSchema = Joi.object({
  email: Joi.string().max(20).required(),
  password: Joi.string().max(30).required(),
});

export const signupValidationSchema = Joi.object({
  // name: Joi.string().max(20).min(2).required(),
  email: Joi.string().max(30).min(3).required(),
  password: Joi.string().max(30).required(),
  role: Joi.string().valid(userRolesEnum.USER, userRolesEnum.ADMIN),
});

export const updateUserValidationSchema = Joi.object({
  name: Joi.string().max(20).min(2).required(),
  email: Joi.string().max(30).min(3).required(),
  password: Joi.string().max(30).required(),
  role: Joi.string().valid(userRolesEnum.USER, userRolesEnum.ADMIN),
  id: Joi.string().custom(validateObgetId),
});

import { User } from "../models/user.js";

export function getAllActivated() {
  return User.findAll({ where: { activationToken: null } });
}

export const userService = {
  getAllActivated,
};

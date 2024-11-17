import { User } from "../models/user.js";

function getAllActivated() {
  return User.findAll({ where: { activationToken: null } });
}

function findByEmail(email) {
  return User.findOne({ where: { email } });
}

function findByActivationToken(token) {
  return User.findOne({ where: { activationToken: token } });
}

function normalize({ id, email }) {
  return { id, email };
}

export const userService = {
  getAllActivated,
  findByEmail,
  findByActivationToken,
  normalize,
};

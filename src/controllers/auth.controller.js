import { v4 as uuidv4 } from "uuid";
import { User } from "../models/user.js";
import { emailService } from "../services/email.service.js";
import { userService } from "../services/user.service.js";
import { jwtService } from "../services/jwt.service.js";

function validateEmail(value) {
  if (!value) {
    return "Email is required";
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return "Email is not valid";
  }
}

function validatePassword(value) {
  if (!value) {
    return "Password is required";
  }

  if (value.length < 8) {
    return "At least 8 characters";
  }
}

const register = async (req, res) => {
  const { email, password } = req.body;
  const activationToken = uuidv4();

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (errors.email || errors.password) {
    res.status(400).send(errors);
    return;
  }

  // create new user only if there is no user with the same email
  const user = await emailService.isEmailExist(email);

  if (user) {
    res.sendStatus(409);
    return;
  }

  const newUser = await User.create({ email, password, activationToken });

  await emailService.sendActivationEmail(email, activationToken);

  res.sendStatus(201);
};

const activate = async (req, res) => {
  const { activationToken } = req.params;
  const user = await userService.findByActivationToken(activationToken);

  if (!user) {
    res.sendStatus(404);
    return;
  }

  user.activationToken = null;
  await user.save();

  res.send(user);
};

const emailVerification = async (req, res) => {
  const { email } = req.body || null;

  if (!email) {
    res.sendStatus(400);
    return;
  }

  const user = await emailService.isEmailExist(email);

  if (!user) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(200);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.findByEmail(email);

  if (!user || user.password !== password) {
    res.sendStatus(401);
    return;
  }

  const normalizedUser = userService.normalize(user);
  const accessToken = jwtService.sign(normalizedUser);

  res.send({
    user: normalizedUser,
    accessToken,
  });
};

export const authController = {
  register,
  activate,
  emailVerification,
  login,
};

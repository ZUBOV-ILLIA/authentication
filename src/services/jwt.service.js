import jwt from "jsonwebtoken";

function sign(user) {
  const token = jwt.sign(user, process.env.JWT_KEY);

  return token;
}

function verify(token) {
  try {
    return jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
    console.log(error);
  }
}

export const jwtService = {
  sign,
  verify,
};

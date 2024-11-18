import { jwtService } from "../services/jwt.service.js";

export const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  const accessToken = authorizationHeader && authorizationHeader.split(" ")[1];

  if (!accessToken) {
    res.sendStatus(401);
    return;
  }

  const userData = jwtService.verify(accessToken);

  if (!userData) {
    res.sendStatus(401);
    return;
  }

  next();
};

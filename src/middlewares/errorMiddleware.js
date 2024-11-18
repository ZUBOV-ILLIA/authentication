export const errorMiddleware = (err, req, res, next) => {
  if (err) {
    console.error(err);

    res.status(500).send({ message: "Server error" });
    return;
  }

  next();
};

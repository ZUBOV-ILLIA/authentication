import express from "express";
import cors from "cors";
import "dotenv/config";
import { authRouter } from "./routes/auth.route.js";
import { userRouter } from "./routes/user.route.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const PORT = process.env.PORT || 3007;
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(authRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

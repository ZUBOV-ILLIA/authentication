import express from "express";
import "dotenv/config";
import { authRouter } from "./routes/auth.route.js";

const PORT = process.env.PORT || 3007;
const app = express();

app.use(express.json());
app.use(authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

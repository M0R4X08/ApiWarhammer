import express from "express";
import userRouter from "./routes/userRoutes.js";
import rangoRouter from "./routes/rangoRoutes.js";

const app = express();
app.use(express.json());
const port = 3000;

app.use("/api/user", userRouter);
app.use("/api/rango", rangoRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

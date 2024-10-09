import express from "express";
import userRouter from "./routes/userRoutes.js";
import charactersRouter from "./routes/charactersRoutes.js";
import rankRouter from "./routes/rankRoutes.js";
import factionRouter from "./routes/factionRoutes.js";
import alignmentRouter from "./routes/alignmentRoutes.js";
const app = express();
app.use(express.json());
const port = 3000;

app.use("/api/user", userRouter);
app.use("/api/characters", charactersRouter);
app.use("/api/rank", rankRouter);
app.use("/api/faction", factionRouter);
app.use("/api/alingment", alignmentRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

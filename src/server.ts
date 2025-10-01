import express from "express";
import { userRouter } from "./routes/user.routes";
import { specialityRouter } from "./routes/speciality.routes";

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(specialityRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

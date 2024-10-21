import express from "express";
import subscriptionRouter from "./routes/subscriptions.js";
import cors from "cors";
import userRouter from "./routes/users.js";
import "dotenv/config";

const app = express();
const PORT = 3000;

// JSON
app.use(express.json());
app.use(cors());

// Subscription Routes
app.use("/api/v1/subscriptions", subscriptionRouter);
// User Routes
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});

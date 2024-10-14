import express from "express";
import pool from "./db.js";
import router from "./routes/subscriptions.js";
import cors from "cors";

const app = express();
const PORT = 3000;

// JSON
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/subscriptions", router);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});

import { Router } from "express";
import {
  createSubscription,
  deleteSubscription,
  getSubscription,
  getSubscriptions,
  updateSubscription,
} from "../controllers/subscriptionController.js";
import authorize from "../middleware/authorize.js";

const subscriptionRouter = Router();

// authorize middleware gives us access to the logged in users id
subscriptionRouter.get("/", authorize, getSubscriptions);
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.patch("/:id", authorize, updateSubscription);
subscriptionRouter.get("/:id", authorize, getSubscription);
subscriptionRouter.delete("/:id", authorize, deleteSubscription);

export default subscriptionRouter;

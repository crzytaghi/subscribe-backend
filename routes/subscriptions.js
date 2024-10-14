import { Router } from "express";
import {
  createSubscription,
  deleteSubscription,
  getSubscription,
  getSubscriptions,
  updateSubscription,
} from "../controllers/subscriptionController.js";

const router = Router();

router.get("/", getSubscriptions);
router.post("/", createSubscription);
router.patch("/:id", updateSubscription);
router.get("/:id", getSubscription);
router.delete("/:id", deleteSubscription);

export default router;

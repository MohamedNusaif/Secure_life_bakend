import { Router } from "express";

import {
  getPlans,
  createPlan,
  deletePlan,
} from "../controllers/plan.controller";

import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware";

const router = Router()

/*
  Public
*/
router.get("/", getPlans);
router.delete(
  "/:id",
  deletePlan
);
/*
  Admin only
*/
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createPlan
);

export default router;
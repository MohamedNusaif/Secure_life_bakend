import { Router } from "express";

import {
  getPlans,
  getActivePlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
} from "../controllers/planController";

import {
  recommendPlans,
} from "../controllers/planRecommendationController";

const router = Router();

router.get("/", getPlans);

router.get(
  "/active",
  getActivePlans
);

router.get(
  "/recommend",
  recommendPlans
);

router.get(
  "/:id",
  getPlanById
);

router.post(
  "/",
  createPlan
);

router.put(
  "/:id",
  updatePlan
);

router.delete(
  "/:id",
  deletePlan
);

export default router;
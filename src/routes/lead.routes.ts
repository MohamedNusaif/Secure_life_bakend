import { Router } from "express";

import {
  createLead,
  getLeads,
  getLeadById,
  getAdvisors,
  assignAdvisor,
  updateLeadStatus,
  addLeadActivity,
  getLeadActivities,
} from "../controllers/lead.controller";

import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

router.post("/", createLead);

/*
|--------------------------------------------------------------------------
| CRM
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  authenticate,
  getLeads
);

router.get(
  "/advisors/list",
  authenticate,
  getAdvisors
);

router.get(
  "/:id",
  authenticate,
  getLeadById
);

router.patch(
  "/:id/status",
  authenticate,
  updateLeadStatus
);

router.post(
  "/:id/assign",
  authenticate,
  authorize("ADMIN"),
  assignAdvisor
);

router.post(
  "/:id/activities",
  authenticate,
  addLeadActivity
);

router.get(
  "/:id/activities",
  authenticate,
  getLeadActivities
);

export default router;
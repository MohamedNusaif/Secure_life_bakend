import { Router } from 'express';
import {
  getAdvisors,
  getActiveAdvisors,
  getAdvisorById,
  createAdvisor,
  updateAdvisor,
  deleteAdvisor,
} from '../controllers/advisorController'; // adjust import path as needed

const router = Router();

// GET /api/advisors - Fetch all advisors
router.get('/', getAdvisors);

// GET /api/advisors/active - Fetch active advisors (sorted by currentLeadCount)
router.get('/active', getActiveAdvisors);

// GET /api/advisors/:id - Fetch a single advisor by ID
router.get('/:id', getAdvisorById);

// POST /api/advisors - Create a new advisor
router.post('/', createAdvisor);

// PUT /api/advisors/:id - Update an advisor
router.put('/:id', updateAdvisor);

// DELETE /api/advisors/:id - Delete an advisor (if no assigned leads)
router.delete('/:id', deleteAdvisor);

export default router;
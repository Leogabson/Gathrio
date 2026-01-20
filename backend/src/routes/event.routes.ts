import { Router } from "express";
import {
  create,
  list,
  getOne,
  update,
  remove,
  getMyEvents,
  getFeatured,
  getLive,
  getMetrics,
} from "../controllers/event.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/featured", getFeatured);
router.get("/live", getLive);
router.get("/metrics", getMetrics);
router.get("/my-events", authenticate, getMyEvents);
router.get("/", list);
router.get("/:id", getOne);
router.post("/", authenticate, create);
router.put("/:id", authenticate, update);
router.delete("/:id", authenticate, remove);

export default router;

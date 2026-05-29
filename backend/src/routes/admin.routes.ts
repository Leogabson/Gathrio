import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  verifyUser,
  deleteUser,
} from "../controllers/admin.controller";
import { authenticate, requireRole } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);
router.use(requireRole(["admin"]));

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id/role", updateUserRole);
router.patch("/users/:id/verify", verifyUser);
router.delete("/users/:id", deleteUser);

export default router;
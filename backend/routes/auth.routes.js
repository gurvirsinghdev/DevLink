import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protect, (req, res) => {
  return res.status(200).json({
    message: "Your Profile",
    user: req.user,
  });
});

export default router;

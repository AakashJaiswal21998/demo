import { Router } from "express";
import { contactUs, getContactUs } from "./../controllers/contactusController";
import { verifyToken } from "./../controllers/tokenController";

const router = Router();

router.post("/contact-us", contactUs);
router.get("/contact-us", verifyToken, getContactUs);

export default router;

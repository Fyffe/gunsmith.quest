import { Router } from "express";
import { getPart, getPartsList } from "@controllers/quest_parts_controller";

const router = Router();

router.get("/list", getPartsList);

router.get("/:id", getPart);

export default router;
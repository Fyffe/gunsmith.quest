import { Router } from "express";
import { addItem, getItem, getItemsList } from "@controllers/items_controller";

const router = Router();

router.get("/list", getItemsList);

router.get("/:slug", getItem);

router.post("/add", addItem);

export default router;
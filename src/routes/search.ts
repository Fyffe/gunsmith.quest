import { Router } from "express";
import { getSearchItems } from "@controllers/search_controller";

const router = Router();

router.get("/items", getSearchItems);

export default router;
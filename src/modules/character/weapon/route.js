import { Router } from "express";
import { charWeaponsController } from "./controller.js";

const router = Router();

router.get("/charWeapons", charWeaponsController.getAllCharWeapons); 

export default router;
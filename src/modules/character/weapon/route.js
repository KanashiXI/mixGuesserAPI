import { Router } from "express";
import { charWeaponsController } from "./controller.js";

const router = Router();

router.get("/charWeapons", charWeaponsController.getAllCharWeapons); 
router.post("/charWeapons", charWeaponsController.addListCharWeapons);
router.put("/charWeapon/:id", charWeaponsController.editCharWeapon);
router.delete("/charWeapon/:id", charWeaponsController.deleteCharWeapon);

export default router;
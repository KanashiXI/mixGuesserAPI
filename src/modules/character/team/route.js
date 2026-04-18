import { Router } from "express";
import { charTeamController } from "./controller.js";

const router = Router();

router.get("/charTeams", charTeamController.getAllCharTeams);
router.post("/charTeams", charTeamController.addListCharTeams);
router.put("/charTeams/:id", charTeamController.editCharTeam);
router.delete("/charTeams/:id", charTeamController.deleteCharTeam);

export default router;
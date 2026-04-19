import express from "express";
import { charWeaponService } from "./service.js";

const charWeaponsController = {
  getAllCharWeapons: async (req, res) => {
    try {
      const charWeapons = await charWeaponService.getAllCharWeapons();
      return res.sendResponse({
        code: 200,
        status: "success",
        message: "Character weapons retrieved successfully",
        data: charWeapons,
      });
    } catch (error) {
      console.error("Error fetching character weapons:", error);
      return res.sendResponse({
        code: 500,
        status: "error",
        message: "Failed to retrieve character weapons",
        data: null,
      });
    }
  }
}

export { charWeaponsController };
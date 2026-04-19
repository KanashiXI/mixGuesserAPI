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
  },
  addListCharWeapons: async (req, res) => {
    try {
      const newCharWeapons = await charWeaponService.addBulkCharWeapons(req.body);
      return res.sendResponse({
        code: 201,
        status: "success",
        message: "Character weapons created successfully",
        data: newCharWeapons,
      });
    } catch (error) {
      console.error("Error creating character weapons:", error);

      if (error.message.includes("atleast one")) {
        return res.sendResponse({
          code: 400,
          status: "error",
          message: error.message,
          data: [],
        });
      }

      return res.sendResponse({
        code: 500,
        status: "error",
        message: "Failed to create character weapons",
        data: null,
      });
    }
  },
  editCharWeapon: async (req, res) => {
    try {
      const { id } = req.params;
      const charWeaponData = req.body;
      const updatedWeapon = await charWeaponService.editCharWeapon(id, charWeaponData);
      return res.sendResponse({
        code: 200,
        status: "success",
        message: "Character weapon updated successfully",
        data: updatedWeapon,
      });
    }
    catch (error) {
      console.error("Error updating character weapon:", error);
      if (error.message.includes("not found")) {
        return res.sendResponse({
          code: 400,
          status: "error",
          message: error.message,
          data: null,
        });
      }

      return res.sendResponse({
        code: 500,
        status: "error",
        message: "Failed to update character weapon",
        data: null,
      });
    }
  },
  deleteCharWeapon: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedWeapon = await charWeaponService.deleteCharWeapon(id);
      return res.sendResponse({
        code: 200,
        status: "success",
        message: "Character weapon deleted successfully",
        data: deletedWeapon,
      });
    } catch (error) {
      console.error("Error deleting character weapon:", error);
      if (error.message.includes("not found")) {
        return res.sendResponse({
          code: 400,
          status: "error",
          message: error.message,
          data: null,
        });
      }

      return res.sendResponse({
        code: 500,
        status: "error",
        message: "Failed to delete character weapon",
        data: null,
      });
    }
  }
}

export { charWeaponsController };
import express from "express";
import { charTeamService } from "./service.js";

const charTeamController = {
  getAllCharTeams: async (req, res) => {
    try {
      const charTeams = await charTeamService.getAllCharTeams();
      return res.sendResponse({
        code: 200,
        status: "success",
        message: "Character teams retrieved successfully",
        data: charTeams,
      });
    } catch (error) {
      console.error("Error fetching character teams:", error);
      return res.sendResponse({
        code: 500,
        status: "error",
        message: "Failed to retrieve character teams",
        data: null,
      });

    }
  },
  addListCharTeams: async (req, res) => {
    try {
      // const charTeamData = req.body;
      const newCharTeams = await charTeamService.addBulkCharTeams(req.body);
      return res.sendResponse({
        code: 201,
        status: "success",
        message: "Character teams created successfully",
        data: newCharTeams,
      });
    }
    catch (error) {
      console.error("Error creating character teams:", error);
      
      // Return 400 for validation errors
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
        message: "Failed to create character teams",
        data: [],
      });
    }
  },
  editCharTeam: async (req, res) => {
    try {
      const { id } = req.params;
      const charTeamData = req.body;
      const updatedCharTeam = await charTeamService.editCharTeam(id, charTeamData);
      return res.sendResponse({
        code: 200,
        status: "success",
        message: "Character team updated successfully",
        data: updatedCharTeam,
      });
    } catch (error) {
      console.error("Error editing character team:", error);
      if (error.message.includes("Team not found")) {
        return res.sendResponse({
          code: 400,
          status: "error",
          message: "Team not found",
          data: null,
        });
      }
      return res.sendResponse({
        code: 500,
        status: "error",
        message: "Failed to update character team",
        data: null,
      });
    }
  },
  deleteCharTeam: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCharTeam = await charTeamService.deleteCharTeam(id);
      return res.sendResponse({
        code: 200,
        status: "success",
        message: "Character team deleted successfully",
        data: deletedCharTeam,
      });
    } catch (error) {
      console.error("Error deleting character team:", error);
      if (error.message.includes("currently in use")) {
        return res.sendResponse({
          code: 400,
          status: "error",
          message: error.message,
          data: null,
        });
      }
      if (error.message.includes("Team not found")) {
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
        message: "Failed to delete character team",
        data: null,
      });
    }

  }
}

export { charTeamController };
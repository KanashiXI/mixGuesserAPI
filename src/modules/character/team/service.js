import CharTeamsModel from "../../../models/character/teamsModel.js";
import CharacterModel from "../../../models/character/charactersModel.js";

const charTeamService = {
  async getAllCharTeams() {
    try {
      const charTeams = await CharTeamsModel.findAll({
        attributes: ["char_team_id", "char_team_name"],
        raw: true,
        order: [["char_team_id", "ASC"]],
      });
      return charTeams;
    } catch (error) {
      console.error("Error fetching character teams:", error);
      throw error;
    }
  },
  async addBulkCharTeams(charTeamData) {
    try {
      if (!Array.isArray(charTeamData) || charTeamData.length === 0) {
        throw new Error("Input atleast one team");
      }

      const incomingList = charTeamData.map((team) => team.char_team_name);

      const allTeams = await this.getAllCharTeams();

      const existingNames = new Set(
        allTeams.map((team) => team.char_team_name),
      );
      const newTeams = [];
      const existingTeams = [];
      for (const name of charTeamData) {
        if (!existingNames.has(name.char_team_name)) {
          newTeams.push({ 
            char_team_name: name.char_team_name,
            guess_type: name.guess_type
          });
        } else {
          existingTeams.push(name.char_team_name);
        }
      }

      let newTeamNames = [];
      if (newTeams.length > 0) {
        newTeamNames = await CharTeamsModel.bulkCreate(newTeams);
      }

      return {
        "newTeams": {
          count: newTeamNames.length,
          teams: newTeamNames.map((team) => team.char_team_name),
        },
        "existingTeams": {
          count: existingTeams.length,
          teams: existingTeams,
        }
      };

    } catch (error) {
      console.error("Error creating character team:", error);
      throw error;
    }
  },
  async editCharTeam(id, updateData) {
    try {
      const team = await CharTeamsModel.findByPk(id);
      if (!team) {
        throw new Error("Team not found");
      }
      await team.update(updateData);
      return team;
    } catch (error) {
      console.error("Error editing team:", error);
      throw error;
    }
  },
  async deleteCharTeam(id) {
    try {
      const team = await CharTeamsModel.findByPk(id);
      
      if (!team) {
        throw new Error("Team not found");
      }
      
      const useageCount = await CharacterModel.count({
        where: {
          team: id
        }
      });
      if (useageCount > 0) {
        throw new Error("Cannot delete team that is currently in use.");
      }
      else {
        await team.destroy();
      }
      return team;
    } catch (error) {
      console.error("Error deleting team:", error);
      throw error;
    }
  }
};

export { charTeamService };

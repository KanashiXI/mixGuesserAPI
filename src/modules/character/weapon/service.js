import WeaponModel from '../../../models/character/weaponsModel.js';
import CharacterModel from '../../../models/character/charactersModel.js';

const charWeaponService = {
  async getAllCharWeapons() {
    try {
      const charWeapons = await WeaponModel.findAll({
        attributes: ['char_wp_id', 'char_wp_name', 'guess_type'],
        raw: true,
      })
      return charWeapons;
    } catch (error) {
      console.error("Error fetching character weapons:", error);
      throw error;
    }
  },
  async addBulkCharWeapons(charWeaponData) {
    try {
      if (!Array.isArray(charWeaponData) || charWeaponData.length === 0) {
        throw new Error("Input atleast one weapon");
      }

      const incomingList = charWeaponData.map((weapon) => weapon.char_wp_name);
      const allWeapons = await this.getAllCharWeapons();

      const existingNames = new Set(
        allWeapons.map((weapon) => weapon.char_wp_name),
      );
      const newWeapons = [];
      const existingWeapons = [];
      for (const name of charWeaponData) {
        if (!existingNames.has(name.char_wp_name)) {
          newWeapons.push({ 
            char_wp_name: name.char_wp_name, 
            guess_type: name.guess_type 
          });
        } else {
          existingWeapons.push(name.char_wp_name);
        }
      }

      let newWeaponNames = [];
      if (newWeapons.length > 0) {
        newWeaponNames = await WeaponModel.bulkCreate(newWeapons);
      }

      return {
        "newWeapons": {
          count: newWeaponNames.length,
          weapons: newWeaponNames.map((weapon) => weapon.char_wp_name),
        },
        "existingWeapons": {
          count: existingWeapons.length,
          weapons: existingWeapons,
        }
      };
    }
    catch (error) {
      console.error("Error creating character weapons:", error);
      throw error;
    }
  },
  async editCharWeapon(id, charWeaponData) {
    try {
      const weapon = await WeaponModel.findByPk(id);
      if (!weapon) {
        throw new Error("Character weapon not found");
      }
      await weapon.update(charWeaponData);
      return weapon;
    } catch (error) {
      console.error("Error editing character weapon:", error);
      throw error;
    }
  },
  deleteCharWeapon: async (id) => {
    try {
      const weapon = await WeaponModel.findByPk(id);
      if (!weapon) {
        throw new Error("Character weapon not found");
      }
      const usageCount = await CharacterModel.count({
        where: { weapon: id },
      });
      if (usageCount > 0) {
        throw new Error("Cannot delete weapon that is currently in use");
      }
      else {
        await weapon.destroy();
      }
      return weapon
    }
    catch (error) {
      console.error("Error deleting character weapon:", error);
      throw error;
    }
  }
};

export { charWeaponService };
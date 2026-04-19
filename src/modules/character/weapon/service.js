import WeaponModel from '../../../models/character/weaponsModel.js';

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
  }
}

export { charWeaponService };
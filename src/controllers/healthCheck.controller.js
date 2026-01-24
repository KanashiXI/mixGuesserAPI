import { healthCheckModel } from "../models/healthCheck.model.js";

const healthChceckController = { 
  getCheckDB: async (req, res) => {
    try {
      await healthCheckModel.dbCheck(req, res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 'error', message: err.message });
    }
  }
}

export { healthChceckController };
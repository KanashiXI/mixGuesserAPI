import { healthCheckSevice } from "./service.js";

const healthCheckController = { 
  getCheckDB: async (req, res) => {
    try {
      await healthCheckSevice.dbCheck(req, res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 'error', message: err.message });
    }
  }
}

export { healthCheckController };
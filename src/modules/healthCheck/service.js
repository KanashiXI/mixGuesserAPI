import { checkDatabaseHealth } from '../../config/database.js';

const healthCheckService = {
  async dbCheck (req, res) {
    try {
      const result = await checkDatabaseHealth();
      if (result.status === 'UP') {
        return res.status(200).json({ status: 'UP', message: result.message });
      }
      return res.status(503).json({ status: 'DOWN', message: result.message });
    } catch (err) {
      console.error('Health check failed:', err);
      return res.status(500).json({ status: 'ERROR', message: err.message });
    }
  }
}

export { healthCheckService };
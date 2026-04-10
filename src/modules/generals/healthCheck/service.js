import { checkDatabaseHealth } from '../../../config/database.js';

const healthCheckService = {
  async dbCheck (req, res) {
    try {
      const result = await checkDatabaseHealth();
      if (result.status === 'UP') {
        return res.sendResponse({ code: 200, status: 'UP', message: result.message });
      }
      return res.sendResponse({ code: 503, status: 'DOWN', message: result.message });
    } catch (err) {
      console.error('Health check failed:', err);
      return res.sendResponse({ code: 500, status: 'ERROR', message: err.message });
    }
  }
}

export { healthCheckService };
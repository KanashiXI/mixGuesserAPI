//Example

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // keep this in .env, never hardcode

/**
 * requireAuth
 * Verifies the JWT from the Authorization header.
 * Attaches decoded payload (e.g. { id, roles }) to req.user.
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization; // expects "Bearer <token>"

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // e.g. { id: 1, username: 'jsmith92', roles: ['player', 'admin'] }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
}

/**
 * requireRole
 * Checks that req.user has at least one of the allowed roles.
 * Must run AFTER requireAuth.
 *
 * Usage: router.delete('/users/:id', requireAuth, requireRole('admin'), controller.deleteUser)
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const userRoles = req.user.roles || [];
    const hasPermission = allowedRoles.some((role) => userRoles.includes(role));

    if (!hasPermission) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
}

module.exports = {
  requireAuth,
  requireRole,
};

/*
Example route usage:

const { requireAuth, requireRole } = require('../authentication/middleware');

// any logged-in user (player or admin)
router.get('/profile', requireAuth, userController.getProfile);

// admin only
router.delete('/users/:id', requireAuth, requireRole('admin'), userController.deleteUser);

// player OR admin (either role passes)
router.post('/character', requireAuth, requireRole('player', 'admin'), characterController.create);
*/
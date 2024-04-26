const authorization = (allowedRoles) => {
    return (req, res, next) => {
      // Check if user has a role
      if (!req.user || !req.user.role) {
        return res.status(403).json({ message: 'Unauthorized - No role assigned' });
      }
  
      // Check if user's role is allowed
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Unauthorized - Insufficient role permissions' });
      }
  
      // User is authorized
      next();
    };
  };
  
  module.exports = authorization;
  
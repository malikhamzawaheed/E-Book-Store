const adminProtect = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: 'Not authorized as admin' });
    }
  };
  
  module.exports = { adminProtect };
const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(409).json({ error: "Please login first" });
  } else {
    try {
      const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      req.role = decoded.role;
      req.id = decoded.id;
      next();
    } catch (error) {
      return res.status(409).json({ error: "Please login" });
    }
  }
};

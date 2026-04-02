import { verifyToken } from "../utils/jwt.js";

export const authenticateToken = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(401).json({ error: "No authorization headers" });
    }
    if (!auth.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid header format" });
    }
    const token = auth.split(" ")[1];
    const payload = await verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

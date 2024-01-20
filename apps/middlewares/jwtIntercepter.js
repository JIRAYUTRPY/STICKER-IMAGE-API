import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const protect = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith(`Bearer `)) {
    return res.status(401).json({
      message: "Token has invlid format",
    });
  }
  const pureToken = token.split(" ")[1];
  jwt.verify(pureToken, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({
        message: "Token is invalid",
      });
    }
    req.user = payload;
    next();
  });
};

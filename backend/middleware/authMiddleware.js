import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      req.user = await User.findOne({ _id: decoded.userId });

      next();
    } catch (err) {
      res.status(400).json({
        message: "Not Authorized",
      });
    }
  } else {
    res.status(400).json({
      message: "No Token",
    });
  }
};

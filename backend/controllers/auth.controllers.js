import { userSchema } from "../schema.js";
import User from "../models/User.js";
import * as z from "zod";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { validateReqBody } from "../services/auth.services.js";

export const register = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;

    validateReqBody(res, name, email, password);
    userSchema.parse({ name, email, password });

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    generateToken(res, user._id);

    return res.status(201).json({
      message: "User Created Successfully",
      user,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: err.issues[0].message,
      });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  console.log(req.body);

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    console.log(await bcrypt.compare(password, user.password));

    if (user && (await bcrypt.compare(password, user.password))) {
      generateToken(res, user._id);

      return res.status(200).json({ message: "User logged in Successfully" });
    } else {
      return res.status(400).json({
        message: "Wrong Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0), // expire immediately
    httpOnly: true,
    secure: false, // only if using HTTPS
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

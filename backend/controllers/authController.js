import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ADMIN } from "../config/admin.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("REQ BODY:", req.body);

  try {
    if (email !== ADMIN.email) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, ADMIN.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: ADMIN.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import {
  saveUser,
  fetchAllUsers,
  fetchUserById,
  UpdateUserById,
  DeleteUserById,
} from "../models/usersModel.js";

/**
 * Get all users
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

/**
 * Get single user by ID
 */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await fetchUserById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

/**
 * Create new user (with image upload)
 */
export const createUser = async (req, res) => {
  try {
    const {
      first_name,
      middle_name,
      last_name,
      email,
      password,
      birthdate,
      contact,
      next_of_kin,
      next_of_kin_contact,
      role,
      specialty,
      status,
      bio,
    } = req.body;

    console.log("New user data:", req.body);

    if (!password) return res.status(400).json({ error: "Password is required" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const image_url = req.file ? `/uploads/images/${req.file.filename}` : null;

    const newUser = await saveUser({
      first_name,
      middle_name,
      last_name,
      email,
      password: hashedPassword,
      birthdate,
      contact,
      next_of_kin,
      next_of_kin_contact,
      role,
      specialty,
      status,
      bio,
      image_url,
    });

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
};

/**
 * Update existing user (with optional new image)
 */
export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      middle_name,
      last_name,
      email,
      password,
      birthdate,
      contact,
      next_of_kin,
      next_of_kin_contact,
      role,
      specialty,
      status,
      bio,
    } = req.body;

    if (!id) return res.status(400).json({ error: "Missing user ID" });

    const existingUser = await fetchUserById(id);
    if (!existingUser) return res.status(404).json({ error: "User not found" });

    let updatedData = {
      id,
      first_name,
      middle_name,
      last_name,
      email,
      birthdate,
      contact,
      next_of_kin,
      next_of_kin_contact,
      role,
      specialty,
      status,
      bio,
    };

    // If password updated
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    // If new image uploaded → delete old + set new
    if (req.file) {
      if (existingUser.image_url) {
        const oldImagePath = path.join(process.cwd(), existingUser.image_url);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log(`Deleted old image: ${oldImagePath}`);
        }
      }
      updatedData.image_url = `/uploads/images/${req.file.filename}`;
    }

    const updatedUser = await UpdateUserById(updatedData);

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
};

/**
 * Delete user (and their image)
 */
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await fetchUserById(id);
    if (!existingUser) return res.status(404).json({ error: "User not found" });

    // Delete image from disk if exists
    if (existingUser.image_url) {
      const imagePath = path.join(process.cwd(), existingUser.image_url);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await DeleteUserById(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};

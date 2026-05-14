import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    const file = req.file;
    console.log(fullname, email, phoneNumber, password, role);
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(404).json({
        message: "Missing required fields",
        success: false,
      });
    }
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });
    await newUser.save();

    return res.status(201).json({
      message: "Account Created Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error Registering User",
      success: false,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(404).json({
        message: "Missing required fields",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Incorrect Email or Password ",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Incorrect Password ",
        success: false,
      });
    }
    if (user.role !== role) {
      return res.status(404).json({
        message: "You dont have necessary role to access this resource",
        success: false,
      });
    }
    //generate token
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: `Welcome Back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error Login",
      success: false,
    });
  }
};
export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error Logout",
      success: false,
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    console.log(fullname, email, phoneNumber, bio, skills);
    const file = req.file;
    // if (!fullname || !email || !phoneNumber || !bio || !skills) {
    //   return res.status(404).json({
    //     message: "Missing required fields",
    //     success: false,
    //   });
    // }

    // cloudinary upload

    let skillsArray = [];
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    //update user profile
    if (fullname) {
      user.fullname = fullname;
    }
    if (email) {
      user.email = email;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (bio) {
      user.profile.bio = bio;
    }
    if (skills) {
      user.profile.skills = skillsArray;
    }
    if (file) {
      const fileUri = getDataUri(file);
      const cloudinaryResponse = await cloudinary.uploader.upload(
        fileUri.content
      );
      user.profile.resume = cloudinaryResponse.secure_url;
      console.log(user.profile.resume);
      user.profile.resumeOriginalname = file.originalname; // FIXED
    }
    await user.save();
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      skills: user.skills,
    };
    return res.status(200).json({
      message: "Profile Updated Successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error Updating Profile",
      success: false,
    });
  }
};

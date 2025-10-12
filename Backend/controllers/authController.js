import User from "../models/User.js";
import { comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";

const loginUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "data is mondatory" });
    }
    let { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email });
      if (user) {
        const isMatched = comparePassword(password, user.password);
        if (isMatched) {
          const token = generateToken({ id: user._id });
          res.cookie("token", token); //client browser
          res.status(200).send({ message: "login successful" });
        } else {
          return res.status(400).send({ message: "Password not matched" });
        }
      } else {
        return res.status(400).send({ message: "User not exist" });
      }
    } else {
      return res.status(400).send({ message: "Provide all fields" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "something went wrong", error: error.message });
  }
};
export default loginUser;
export const authStatus = async (req, res) => {
  try {
    const { user } = req;
    return res.status(200).send({
      role: user.role,
      name: user.name,
      email: user.email,
      department: user.department,
      status: user.status,
      mobile: user.mobile,
      designation: user.designation,
    });
  } catch (error) {
    return res.status(500).send({
      message: "something went wrong",
      error: error.message,
    });
  }
};
export const userLogout = async (req, res) => {
  try {
    //clear cookie
    const { token } = req.cookies;
    if (token) {
      res.clearCookie("token");
      res.status(200).send({ message: "Logout successful" });
    } else {
      res.status(400).send({ message: "User is not logged in" });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

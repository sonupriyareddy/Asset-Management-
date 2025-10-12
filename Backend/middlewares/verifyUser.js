import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

// export const userAuth = (req, res, next) => {
//     let { token } = req.cookies
//     if (token) {
//         const payload = verifyToken(token)
//         if (payload) {
//             req.payload = payload
//             next()
//         }
//         else {
//             return res.status(400).send({ message: "unAuthorized" })
//         }
//     }
//     else {
//         return res.status(400).send({ message: "unAuthorized" })
//     }
// }

export const verifyUser = async (req, res, next) => {
  try {
    //verify cookie token
    const { token } = req.cookies;
    if (token) {
      try {
        const { id } = verifyToken(token);
        if (id) {
          const user = await User.findById(id);

          if (user) {
            //setting the user data for next middleware
            req.user = user;
            next();
          } else {
            return res.status(401).send({ message: "Access Denied no user" });
          }
        } else {
          return res.status(401).send({ message: "Access Denied no id" });
        }
      } catch (error) {
        return res.status(401).send({ message: "Access Denied invalid token" });
      }
    } else {
      return res.status(401).send({ message: "Access Denied no token" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Server Error", error: error.message });
  }
};

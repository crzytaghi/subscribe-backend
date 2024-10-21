import jwt from "jsonwebtoken";
import "dotenv/config";

const authorize = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    const payload = await jwt.verify(jwtToken, process.env.JWT_SECRET);

    // Returns the req.user from the payload, which is where we set the user key to the uuid of that user
    req.user = payload.user;

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Not Authorized");
  }
};

export default authorize;

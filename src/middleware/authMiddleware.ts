import jwt from "jsonwebtoken";

// Deny access to endpoints when user is authenticated
export const allowIfAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

// Grant access to endpoints when user is authenticated
export const denyIfAuthenticated = (req, res, next) => {
  return next();
};

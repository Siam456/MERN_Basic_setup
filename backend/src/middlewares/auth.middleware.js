const jwt = require("jsonwebtoken");
const { getUserById } = require("../services/userServices");
const HttpException = require("../exceptions/httpException");

const authMiddleware = async (req, res, next) => {
  try {
    const Authorization =
      req.header("Authorization").split("Bearer ")[1] || null;

    if (Authorization) {
      const secretKey = process.env.JWT_SECRATE;
      const verificationResponse = await jwt.verify(Authorization, secretKey);
      const userId = verificationResponse.payload._id;
      const findUser = await getUserById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, "Wrong authentication token"));
      }
    } else {
      next(new HttpException(404, "Authentication token missing"));
    }
  } catch (error) {
    next(new HttpException(401, "Wrong authentication token"));
  }
};

module.exports = authMiddleware;

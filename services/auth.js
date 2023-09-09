const jwt = require("jsonwebtoken");

// create a global secret for generating jwt
const secretKey = "$ecret49";

// create a function to create a jwt
function createTokenForUser(user) {
  // 1. Create payload from user data
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  // 2. call jwt sign api with payload, secret key and another options
  const token = jwt.sign(payload, secretKey);
  return token;
}

// create a validate fn for jwt
function validateToken(token) {
  const payload = jwt.verify(token, secretKey);
  return payload;
}

// exports
module.exports = {
  createTokenForUser,
  validateToken,
};

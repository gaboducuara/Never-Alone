import jwt from "jsonwebtoken";

import { configuration } from "../../config.js";

const { token } = configuration;
const { secret, expires } = token;

export const signToken = (payload, expiresIn = expires) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const auth = async (req, res, next) => {
  let token = req.headers.authorization || "";

  if (token.startsWith("Bearer")) {
    token = token.slice(7);
  }
  if (!token) return next({ message: "Forbidden", status: 403 });

  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      next({ message: "Forbidden", status: 403 });
    }
    req.decoded = decoded;
    next();
  });
};

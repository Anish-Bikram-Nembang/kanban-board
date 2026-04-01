import { SignJWT } from "jose";
import { createSecretKey } from "node:crypto";
import env from "../config/env.js";

const generateToken = (payload) => {
  const secret = env.JWT_SECRET;
  const secretKey = createSecretKey(secret, "utf-8");

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN)
    .sign(secretKey);
};
export default generateToken;

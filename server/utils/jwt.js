import { SignJWT, jwtVerify } from "jose";
import { createSecretKey } from "node:crypto";
import env from "../config/env.js";

export const generateToken = (payload) => {
  const secretKey = createSecretKey(env.JWT_SECRET, "utf-8");

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN)
    .sign(secretKey);
};

export const verifyToken = async (token) => {
  const secretKey = createSecretKey(env.JWT_SECRET, "utf-8");
  const { payload } = await jwtVerify(token, secretKey);
  return payload;
};

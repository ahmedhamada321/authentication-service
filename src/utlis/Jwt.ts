import { verify, sign } from "jsonwebtoken";
import { config } from "dotenv";
config();
const jwtSecretKEY = process.env.jwtSecretKEY as string;
const jwtExpiresIN = process.env.jwtExpiresIN as string;

const verifyJWTToken = async (token: string): Promise<any> => {
  if (!token) throw new Error(`Invalid token`);

  try {
    const decoded = await verify(token, jwtSecretKEY);

    return decoded;
  } catch (error) {
    throw new Error("Invalid token.");
  }
};

const generateJWTToken = (data: any) => {
  return sign(data, jwtSecretKEY, {
    expiresIn: jwtExpiresIN || "30d",
  });
};

const sanitizeAndDeleteBearerJWT = (token: string | string[]) => {
  return String(token).replace("Bearer", "").trim();
};

export { generateJWTToken, verifyJWTToken, sanitizeAndDeleteBearerJWT };

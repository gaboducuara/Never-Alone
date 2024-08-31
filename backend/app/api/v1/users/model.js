import { hash, compare } from "bcrypt";

export const fields = ["id", "email", "name", "role", "created_at", "updated_at"];

export const encryptPassword = async (password) => {
  const saltRounds = 10;
  return hash(password, saltRounds);
};

export const verifyPassword = async (password, encryptPassword) => {
  return compare(password, encryptPassword);
};

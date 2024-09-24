import { pool } from "./config.js";

export const createUser = async (username, hashedPassword) => {
  try {
    await pool.query(
      "INSERT INTO user_table (user_name , password) VALUES ($1 ,$2)",
      [username, hashedPassword]
    );
  } catch (err) {
    console.error("Error inserting user: ", err);
  }
};



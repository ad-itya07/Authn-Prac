import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { pool } from "../db/config.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await pool.query(
        "SELECT * FROM user_table WHERE user_name = $1",
        [username]
      );

      if (result.rows.length === 0) {
        return done(null, false, { message: "Incorrect Username" });
      }

      const user = result.rows[0];

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect Password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM user_table WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return done(new Error("user not found"));
    }
    done(null, result.rows[0]);
  } catch (error) {
    done(error);
  }
});

export default passport;
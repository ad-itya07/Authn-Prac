import express from "express";
import bcrypt from "bcrypt";
import { createUser } from "../db/queries.js";
import passport from "../config/passportconfig.js";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/dashboard", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("Welcome to your dashboard");
  } else {
    res.redirect("/login");
  }
});

router.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    await createUser(username, hashedPassword);
    res.status(201).json({ success: "Successfully signed up!" });
  } catch (error) {
    console.error("Error in signup route", error);
    res.status(500).send("Error creating user");
  }
});

router.get("/", async (req, res) => {});

export default router;

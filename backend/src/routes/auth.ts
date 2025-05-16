import express, { Request, Response } from "express";
import validateAuth from "../middlewares/validateAuth";
import { pool } from "..";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenGen";
import { RegisterUser, User } from "../types/datatypes";
import jwt, { JwtPayload } from "jsonwebtoken";

const router = express();

router.post("/signup", validateAuth, async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password, confirm_password } =
      req.body as RegisterUser;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rowCount !== 0) {
      res.status(409).json({
        title: "Email Exists",
        message:
          "This email is already being used. Please use a different one.",
      });
      return;
    }
    if (password !== confirm_password) {
      res.status(409).json({
        title: "Password and Confirm Password does not match.",
        message:
          "Please input the passwords again while making sure they are the same.",
      });
      return;
    }
    const salt = (await bcrypt.genSalt(11)) as string;
    const hashedPassword = await bcrypt.hash(password!, salt);
    await pool.query(
      "INSERT INTO users (first_name, last_name, email, password, salt) VALUES ($1, $2, $3, $4, $5)",
      [first_name, last_name, email, hashedPassword, salt],
    );
    res.status(200).json({
      title: "Account Created Successfully",
      message: `Welcome to CodeGreen ${first_name} ${last_name}`,
    });
  } catch (error) {
    res.sendStatus(500).json({ title: "Unknown Error", message: error });
  }
});

router.post("/login", validateAuth, async (req: Request, res: Response) => {
  try {
    const { email, password } = await req.body;

    const { rows: users } = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    const user = (await users[0]) as User;

    if (!user) {
      res.status(401).json({
        title: "Wrong Email or Password",
        message: "The credentials entered are invalid.",
      });
      return;
    }

    const salt = user.salt;
    const hashedPassword = await bcrypt.hash(password, salt!);

    if (user.password !== hashedPassword) {
      res.status(401).json({
        title: "Wrong Email or Password",
        message: "The credentials entered are invalid.",
      });
      return;
    }

    const refreshToken = generateRefreshToken(user.id!);
    const accessToken = generateAccessToken(user.id!);
    await pool.query("UPDATE users SET refresh_token = $1 WHERE id = $2", [
      refreshToken,
      user.id,
    ]);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken, isAdmin: user.is_admin, id: user.id });
  } catch (error) {
    console.error(error);
    const errorMessage = (error as Error).message;
    res.status(500).json({ title: "Unknown Error", message: errorMessage });
  }
});

router.get("/refresh", async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      res.status(401).json({
        title: "You are not authorized.",
        message: "Please login to access these features.",
      });
      return;
    }

    const refreshToken = cookies.jwt;

    const foundUser = (
      await pool.query("SELECT * FROM users WHERE refresh_token = $1", [
        refreshToken,
      ])
    ).rows[0];

    if (!foundUser) {
      res.status(403).json({
        title: "No Access Rights",
        message: "You do not have access to these features.",
      });

      return;
    }

    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
      ) as JwtPayload;

      const accessToken = generateAccessToken(payload.userId);
      res
        .status(200)
        .json({ accessToken, isAdmin: foundUser.is_admin, id: foundUser.id });
    } catch {
      res.status(403).json({
        title: "No Access Rights",
        message: "You do not have access to these features.",
      });
      return;
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ title: "Unknown Error", message: errorMessage });
  }
});

router.get("/logout", async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      res.status(204).json({
        title: "No Content",
        message: "There is no content to be shown.",
      });
      return;
    }

    const refreshToken = await cookies.jwt;

    const { rows: users } = await pool.query(
      "SELECT * FROM users WHERE refresh_token = $1",
      [refreshToken],
    );

    const foundUser = users[0];

    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
      });
      res.status(204).json({
        title: "No Content",
        message: "There is no content to be shown.",
      });
      return;
    }

    await pool.query("UPDATE users SET refresh_token = NULL WHERE id = $1", [
      foundUser.id,
    ]);

    await pool.query("SELECT * FROM users WHERE id = $1", [foundUser.id]);

    res.status(200).json({
      title: "Log Out Successful",
      message: "Thank you for visiting, feel free to use our services again.",
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ title: "Unknown Error", message: errorMessage });
  }
});
export default router;

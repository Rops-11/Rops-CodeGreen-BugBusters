import express, { Request, Response } from "express";
import { pool } from "..";
import bcrypt from "bcrypt";

const router = express.Router();

// GET route to fetch user info of the logged-in user
router.get("/get", async (req: Request, res: Response) => {
  try {
    const userId = req.user;

    const { rows: users } = await pool.query(
      "SELECT id, first_name, last_name FROM users WHERE id = $1",
      [userId],
    );

    const { rows: registrations } = await pool.query(
      "SELECT * FROM registrations WHERE user_id = $1",
      [userId],
    );

    const { rows: drivers } = await pool.query(
      "SELECT * FROM drivers WHERE user_id = $1",
      [userId],
    );

    res.status(200).json({
      user: users[0],
      hasRegistered: registrations[0] ? true : false,
      isDriver: drivers[0] ? true : false,
    }); // Send the user data as a response
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ title: "Unknown Error", message: errorMessage });
  }
});

router.patch("/change-password", async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const userId = req.user;

    if (![currentPassword, newPassword, confirmNewPassword].every(Boolean)) {
      res.status(401).json({
        title: "Missing Credentials",
        message: "Please input all information needed.",
      });
      return;
    }

    const { rows: users } = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId],
    );

    if (users.length === 0) {
      res.status(404).json({
        title: "User Not Found",
        message: "User was not found in the database.",
      });
      return;
    }

    const foundUser = await users[0];

    const matchPassword = await bcrypt.compare(
      currentPassword,
      foundUser.password,
    );

    if (!matchPassword) {
      res.status(406).json({
        title: "Incorrect Password",
        message: "Please make sure to input the correct current password.",
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      res.status(406).json({
        title: "New Password Does Not Match Confirm Password",
        message:
          "Please make sure that our new password is the same as the confirm password.",
      });
      return;
    }

    const salt = (await bcrypt.genSalt(11)) as string;
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await pool.query(
      "UPDATE users SET password = $2, salt = $3 WHERE id = $1;",
      [userId, hashedNewPassword, salt],
    );

    res.status(200).json({
      title: "Password Changed",
      message: "Password has been successfully changed.",
    });
  } catch {
    res.status(500).json({ message: "An Unknown Error Occured" });
  }
});

export default router;

import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import authRoutes from "./routes/auth";
import verifyToken from "./middlewares/verifyToken";
import cookieParser from "cookie-parser";
import allowedOrigins from "./config/allowedOrigins";
import { credentials } from "./middlewares/credentials";
import driverRoutes from "./routes/driver";
import userRoutes from "./routes/user";

import notificationRoutes from "./routes/notification";
import registrationRoutes from "./routes/registration";
import carRoutes from "./routes/cars";
import violationRoutes from "./routes/violation";
import violatorRoutes from "./routes/violators";
import profileRoutes from "./routes/profile";

dotenv.config({ path: ".env" });
export const server = express();

// Middlewares
server.use(express.json());

// This allows us to fetch from the FRONTEND
server.use(credentials);
server.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not Allowed By CORS"));
      }
    },
    optionsSuccessStatus: 200,
  }),
);

// For Cookies
server.use(cookieParser());

// For Database
neonConfig.webSocketConstructor = ws;
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

server.get("/test", async (req: Request, res: Response) => {
  res.status(200).send("Hello");
});

// Routes
server.use("/auth", authRoutes);
// APIs for Functionality (Must Be Placed Under Verification of Auth)
server.use(verifyToken);
server.use("/driver", driverRoutes); // "/driver/get || /driver/add"
server.use("/registration", registrationRoutes);
server.use("/user", userRoutes);
server.use("/car", carRoutes);
server.use("/profile", profileRoutes);
server.use("/notification", notificationRoutes);
server.use("/violation", violationRoutes);
server.use("/violator", violatorRoutes);

// For PORT
const PORT = Number(process.env.PORT) || 3000;

server.listen(PORT, "::", () => {
  console.log(
    `The Server for CodeGreen has Started at http://localhost:${PORT}`,
  );
});

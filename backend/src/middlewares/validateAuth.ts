import { NextFunction, Request, Response } from "express";

const validateAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log(`>>> validateAuth: Path is ${req.path}`);
  try {
    const validateEmail = (email: string) => {
      if (typeof email !== "string") return false;
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    };

    switch (req.path) {
      case "/signup":
        {
          const { first_name, last_name, email, password, confirm_password } =
            req.body;

          if (
            ![first_name, last_name, email, password, confirm_password].every(
              Boolean,
            )
          ) {
            console.log(">>> validateAuth /signup: Missing credentials");
            res.status(401).json({});
            return;
          }

          if (!validateEmail(email)) {
            console.log(">>> validateAuth /signup: Invalid email");
            res.status(401).json({});
            return;
          }

          if (
            typeof password !== "string" ||
            password.length < 8 ||
            password.length > 20
          ) {
            console.log(
              ">>> validateAuth /signup: Password invalid length or type",
            );
            res.status(401).json({});
            return;
          }
        }
        break;

      case "/login":
        {
          const { email, password } = req.body;
          if (![email, password].every(Boolean)) {
            console.log(">>> validateAuth /login: Missing credentials");
            res.status(401).json({});
            return;
          }
          if (!validateEmail(email)) {
            console.log(">>> validateAuth /login: Invalid email");
            res.status(401).json({});
            return;
          }
        }
        break;
    }
    console.log(">>> validateAuth: Validation complete, calling next()");
    next();
  } catch (error) {
    console.error(">>> ERROR IN validateAuth MIDDLEWARE:", error);

    if (!res.headersSent) {
      res.status(500).json({
        title: "Error during request validation",
        message: (error as Error).message,
      });
    }
  }
};

export default validateAuth;

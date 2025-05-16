import express, { Request, Response } from "express";
import { pool } from "..";
import { Cars } from "../types/datatypes";

const router = express();


router.post("/check-license", async (req: Request, res: Response) => {
  try {
    const { license_number } = req.body;

    const { rows: drivers } = await pool.query(
      `SELECT * FROM drivers WHERE license_number = $1`,
      [license_number],
    );

    const driverFound = drivers[0];

    if (!driverFound) {
      res.status(401).json({
        title: "License Number Not Found",
        message: "Driver with this license number does not exist.",
      });
      return;
    }

    res.status(200).json(driverFound);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ title: "Unknown Error", message: errorMessage });
  }
});

router.post("/add", async (req: Request, res: Response) => {
  try {
    const {
      car_model,
      license_plate,
      brand,
      color,
      driver_id,
      license_number,
    }: Cars = req.body;

    const { rows: drivers } = await pool.query(
      `SELECT id
              FROM drivers
              WHERE id = $1`,
      [driver_id],
    );

    const driverFound = await drivers[0];

    if (!driverFound) {
      res
        .status(404)
        .json({ title: "No Driver Found", message: "Driver is not found." });
      return;
    }

    await pool.query(
      `INSERT INTO cars (
            driver_id,
            car_model,
            license_plate,
            brand,
            color,
            license_number)
            VALUES($1, $2, $3, $4, $5, $6)`,

      [driver_id, car_model, license_plate, brand, color, license_number],
    );
    res.status(200).json({
      title: "Car Added!",
      message: `Car ${brand} ${car_model} ${color} with a license plate of ${license_plate} has been added!`,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ title: "Unknown Error", message: errorMessage });
  }
});

router.get("/get", async (req: Request, res: Response) => {
  try {
    const { driverId } = req.query;

    if (!driverId) {
      res.status(400).json({
        title: "Driver ID is required",
        message: "Please provide a driver ID.",
      });
      return;
    }

    const driverIdStr = String(driverId);

    const { rows: cars } = await pool.query(
      `SELECT car_model, license_plate, brand, color, license_number 
       FROM cars 
       WHERE driver_id = $1`,
      [driverIdStr],
    );

    if (cars.length === 0) {
      res.status(404).json({
        title: "No Cars Found",
        message: "No cars found for the given driver ID.",
      });
      return;
    }

    res.status(200).json(cars);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ title: "Unknown Error", message: errorMessage });
  }
});

router.patch("/update", async (req: Request, res: Response) => {
  try {
    const { id, ...updates } = req.body;

    if (!id) {
      res.status(400).json({
        title: "Validation Error",
        message: "License plate is required to update the record.",
      });
      return;
    }

    const fields = Object.keys(updates);
    const values = Object.values(updates);

    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    const query = `UPDATE cars SET ${setClause}
         WHERE id = $${fields.length + 1} 
         RETURNING *`;

    const result = await pool.query(query, [...values, id]);

    if (result.rowCount === 0) {
      res.status(404).json({
        title: "Not Found",
        message: "Cars with the specified ID does not exist.",
      });
      return;
    }

    const updateCar = result.rows[0];

    res.status(200).json({
      title: "Car Updated!",
      message: `Car has been updated successfully.`,
      driver: updateCar,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ title: "Unknown Error", message: errorMessage });
  }
});

router.delete("/delete", async (req: Request, res: Response) => {
  try {
    await pool.query(
      `DELETE FROM 
            cars 
            WHERE 
            id = $1 
            RETURNING *`,
      [req.body.id],
    );

    res.status(200).json({ message: "Car Added Successfully" });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ title: "Unknown Error", message: errorMessage });
  }
});

export default router;

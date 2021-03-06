const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// GET All Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants");

    res.status(200).json({
      status: "success",
      results: results.rowCount,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (e) {
    console.log("error: ", e);
  }
});

// GET a restaurants
app.get("/api/v1/restaurants/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(`SELECT * FROM restaurants where id = $1`, [
      id,
    ]);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: result.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Create a Restaurants
app.post("/api/v1/restaurants", async (req, res) => {
  const { name, location, price_range } = req.body;

  try {
    const results = await db.query(
      `INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *`,
      [name, location, price_range]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Update Restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const { name, location, price_range } = req.body;

  try {
    const result = await db.query(
      `UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 RETURNING *`,
      [name, location, price_range, id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: result.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await db.query(`DELETE FROM restaurants where id = $1`, [id]);

    res.status(200).json({
      status: "success",
      message: "restaurant remove",
    });
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port = ${port}`);
});

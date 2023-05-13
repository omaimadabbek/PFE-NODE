const express = require("express");
const pool = require("./db");
const app = express.Router();

app.use(express.static("images"));
//***create a categorie***//
app.post("/categorie", async (req, res) => {
  try {
    const { nom_categorie, image } = req.body;
    const newCategorie = await pool.query(
      `INSERT INTO categorie (nom_categorie,image) VALUES ('${nom_categorie}','${image}') RETURNING* `
    );
    res.json(newCategorie);
  } catch (err) {
    console.error(err.message);
  }
});

//***get all categorie***//
app.get("/categorie", async (req, res) => {
  try {
    const allCategorie = await pool.query(`SELECT*FROM categorie`);
    res.json(allCategorie.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//***get a categorie***//
app.get("/categorie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const categorie = await pool.query(
      `SELECT *FROM categorie WHERE id_categorie = ${id}`
    );
    res.json(categorie.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//***update categorie***//
app.put("/categorie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nom_categorie, image } = req.body;
    const updateCategorie = await pool.query(
      `UPDATE categorie SET nom_categorie='${nom_categorie}',image='${image}'
            WHERE id_categorie=${id}`
    );
    res.json("categorie was update!");
  } catch (error) {
    console.error(err.message);
  }
});

//***delete a categorie***//
app.delete("/categorie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategorie = await pool.query(
      `DELETE FROM categorie WHERE id_categorie = ${id}`
    );
    // await DeleteCategorieProduit(id)
    const deleteProduit = await pool.query(
      `DELETE FROM produits WHERE id_categorie = ${id}`
    );

    res.json("categorie was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = app;

const express = require("express");
const pool = require("./db");
const app = express.Router();

//***create a produits*/
app.post("/produits", async (req, res) => {
  try {
    const { id_categorie, nom, prix, image, repture_de_stock, description } =
      req.body;

    const newProduit = await pool.query(
      `INSERT INTO produits (id_categorie,nom,prix,image,repture_de_stock,description)
             VALUES ('${id_categorie}','${nom}','${prix}','${image}','${repture_de_stock}','${description}') RETURNING* `
    );
    res.json(newProduit);
  } catch (err) {
    console.error(err.message);
  }
});

//***get produit */
app.get("/produits", async (req, res) => {
  const date = new Date();
  try {
    const { id } = req.params;
    const produits = await pool.query(`SELECT * FROM produits  `);
    let data = produits.rows;
    for (produit of data) {
      const image =
        produit.image.split("/")[produit.image.split("/").length - 1];
      produit.image = "http://192.168.1.18:5000/" + image;
    }

    res.json(data);
  } catch (err) {
    console.error(err.message);
  }
});

//***update produit */
app.put("/produits/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { id_categorie, nom, prix, image, repture_de_stock, description } =
      req.body;
    console.log(
      id_categorie,
      nom,
      prix,
      image,
      repture_de_stock,
      description,
      id
    );
    const updateProduit = await pool.query(
      `UPDATE produits SET nom='${nom}',prix='${prix}',image='${image}',repture_de_stock='${repture_de_stock}',description='${description}' 
            WHERE id_produit=${id}`
    );
    res.json("produit was update!");
  } catch (error) {
    console.error(err.message);
  }
});

//***delete a produits***//
app.delete("/produits/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduit = await pool.query(
      `DELETE FROM produits WHERE id_produit = ${id}`
    );

    res.json("produit was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = app;

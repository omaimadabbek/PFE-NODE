const express = require("express");
const pool = require("./db");
const app = express.Router();

app.post("/detail_commandes", async (req, res) => {
  try {
    const {
      date_detail_cmd,
      id_commandes,
      designation,
      quantité,
      prix,
      id_client,
    } = req.body;
    console.log(id_commandes, designation, quantité, prix, id_client);
    const date = new Date();
    const dateString = date.toISOString().substring(0, 10);
    const newDetail = await pool.query(
      `INSERT INTO detail_commandes (date_detail_cmd,id_commandes,designation,quantité,prix,id_client)
             VALUES ('${dateString}','${id_commandes}','${designation}','${quantité}','${prix}','${id_client}') RETURNING* `
    );
    console.log("cc");
    res.json(newDetail);
  } catch (err) {
    console.error(err.message);
  }
});

//***get a detail_cmd*/
app.get("/detail_commandes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // const detail= await pool.query(`SELECT *FROM detail_commandes WHERE id_commandes= ${id}` );
    const detail =
      await pool.query(`SELECT c.id_detail as id_detail, c.date_detail_cmd as date_detail_cmd,
        c.id_commandes as id_commandes,c.designation as designation,c.quantité as quantité,c.prix as prix,
        c.id_client as id_client, cl.prenom_client as prenom,cl.nom_client as nom FROM detail_commandes c,client cl
         WHERE c.id_client=cl.id_client and c.id_commandes=${id}`);

    res.json(detail.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//***update a detail_cmd*/
app.put("/detail_commandes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      date_detail_cmd,
      id_commandes,
      designation,
      quantité,
      prix,
      id_client,
    } = req.body;
    const updateDetail = await pool.query(
      `UPDATE produits SET date_detail_cmd='${date_detail_cmd}',id_commandes='${id_commandes}',
            designation='${designation}',quantité='${quantité}',prix='${prix}' ,id_client='${id_client}'
            WHERE id_detail=${id}`
    );
    res.json("commande was update!");
  } catch (error) {
    console.error(err.message);
  }
});

module.exports = app;

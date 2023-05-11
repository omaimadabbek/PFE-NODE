const express = require("express");
const pool = require("./db");
const app = express.Router();

//***create a commandes*/
app.post("/Commandes", async (req, res) => {
  try {
    const { date_cmd, totalcommande, id_client, etat_commande, mdv, adresse } =
      req.body;
    const date = new Date();
    const dateString = date.toISOString().substring(0, 10);
    const newCommandes = await pool.query(
      `INSERT INTO commandes (date_cmd,totalcommande,id_client,etat_commande,mdv,adresse)
             VALUES ('${dateString}','${totalcommande}','${id_client}','${etat_commande}','${mdv}','${adresse}') RETURNING* `
    );
    if (newCommandes.rowCount > 0) {
      res.json(newCommandes);
    }
    //
  } catch (err) {
    console.error(err.message);
  }
});

//***update etat cmd*/
app.put("/commandes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { etat_commande } = req.body;

    const updateCmd = await pool.query(
      `UPDATE commandes SET etat_commande='${etat_commande}'
             WHERE id_commandes=${id}`
    );
    res.json("Commande was update!");
  } catch (error) {
    console.error(err.message);
  }
});

//***get a commandes*/
app.get("/commandes/:id", async (req, res) => {
  const date = new Date();
  try {
    const { id } = req.params;
    const commandes =
      await pool.query(`SELECT c.id_commandes as id_commandes, c.date_cmd as date_cmd,
        c.totalcommande as totalcommande,c.etat_commande as etat_commande,c.mdv as mdv,c.adresse as adresse,
        c.id_client as id_client, cl.prenom_client as prenom,cl.nom_client as nom FROM commandes c,client cl
         WHERE c.id_client=cl.id_client and c.id_client=${id}`);
    res.json(commandes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//*** get all commandes*/
app.get("/commandes", async (req, res) => {
  const date = new Date();
  try {
    const allCommandes =
      await pool.query(`SELECT c.id_commandes as id_commandes,c.date_cmd as date_cmd,
        c.totalcommande as totalcommande,c.etat_commande as etat_commande,c.mdv as mdv,c.adresse as adresse,
        c.id_client as id_client, cl.prenom_client as prenom ,cl.nom_client as nom FROM commandes c,client cl
         WHERE c.id_client=cl.id_client`);
    res.json(allCommandes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = app;

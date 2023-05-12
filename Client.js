const express = require("express");
const pool = require("./db");
const app = express.Router();

//***create a client****//
app.post("/client", async (req, res) => {
  try {
    const {
      nom_client,
      prenom_client,
      email,
      mot_de_passe,
      num_telephone,
      adresse,
    } = req.body;
    console.log("🚀 ~ file: index.js:92 ~ app.post ~ req.body:", req.body);
    const newClient = await pool.query(
      `INSERT INTO client (nom_client,prenom_client,email,mot_de_passe,num_telephone,adresse) 
            VALUES ('${nom_client}','${prenom_client}','${email}','${mot_de_passe}','${num_telephone}','${adresse}') RETURNING* `
    );
    console.log("🚀 ~ file: index.js:97 ~ app.post ~ newClient:", newClient);
    res.json(newClient);
  } catch (err) {
    console.error(err.message);
  }
});
//***get all client***//
app.get("/client", async (req, res) => {
  try {
    const allClient = await pool.query(`SELECT*FROM client`);
    res.json(allClient.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//***get a client***//
app.get("/client/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.query(
      `SELECT *FROM client WHERE id_client = ${id}`
    );
    res.json(client.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/client/:email/:mot_de_passe", async (req, res) => {
  try {
    const { email, mot_de_passe } = req.params;
    let sql = `SELECT* FROM client WHERE email='${email}' and  mot_de_passe='${mot_de_passe}'`;
    const allClient = await pool.query(sql);
    res.json(allClient.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//***update a client*/
app.put("/client/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nom_client,
      prenom_client,
      email,
      mot_de_passe,
      num_telephone,
      adresse,
    } = req.body;
    const updateClient = await pool.query(
      `UPDATE client SET nom_client='${nom_client}',prenom_client='${prenom_client}',email='${email}',mot_de_passe='${mot_de_passe}',num_telephone='${num_telephone}',adresse='${adresse}'
             WHERE id_client=${id}`
    );
    res.json("client was update!");
  } catch (error) {
    console.error(err.message);
  }
});
//***delete a client*/
app.delete("/client/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteClient = await pool.query(
      `DELETE FROM client WHERE id_client = ${id}`
    );

    res.json("client was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = app;

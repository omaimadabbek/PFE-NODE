const express = require("express");
const pool = require("./db");
const app = express.Router();

//***create a admin*/
app.post("/admin", async (req, res) => {
  try {
    const { nom, prenom, mot_de_passe, email, type } = req.body;
    const newAdmin = await pool.query(
      `INSERT INTO admin (nom,prenom,mot_de_passe,email,type) 
            VALUES ('${nom}','${prenom}','${mot_de_passe}','${email}','${type}') RETURNING* `
    );
    res.json(newAdmin);
  } catch (err) {
    console.error(err.message);
  }
});
//***get all admin*/
app.get("/admin", async (req, res) => {
  try {
    const allAdmin = await pool.query(`SELECT*FROM admin`);
    res.json(allAdmin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//***get a admin*/
app.get("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await pool.query(`SELECT *FROM admin WHERE admin_id = ${id}`);
    res.json(admin.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/admin/:email/:mot_de_passe", async (req, res) => {
  try {
    const { email, mot_de_passe } = req.params;
    let sql = `SELECT* FROM admin WHERE email='${email}' and  mot_de_passe='${mot_de_passe}'`;
    const allAdmin = await pool.query(sql);
    res.json(allAdmin.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//***update a admin*/
app.put("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, mot_de_passe, email, type } = req.body;
    const updateAdmin = await pool.query(
      `UPDATE admin SET nom='${nom}', prenom='${prenom}', mot_de_passe='${mot_de_passe}', email='${email}',type='${type}'
             WHERE admin_id=${id}`
    );
    res.json("admin was update!");
  } catch (error) {
    console.error(err.message);
  }
});
//***delete a admin*/
app.delete("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAdmin = await pool.query(
      `DELETE FROM admin WHERE admin_id = ${id}`
    );

    res.json("admin was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = app;

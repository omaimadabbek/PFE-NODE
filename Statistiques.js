const express = require("express");
const pool = require("./db");
const app = express.Router();
// total commande
app.get("/Totalcmd", async (req, res) => {
  try {
    let sql = `	SELECT SUM(CAST(totalcommande AS decimal)) FROM commandes;
`;

    const Somme = await pool.query(sql);
    res.json(Somme.rows[0].sum);
  } catch (error) {
    console.log(error.message);
  }
});

//top client
app.get("/Topclient", async (req, res) => {
  try {
    let sql = `
   SELECT  SUM(CAST(o.totalcommande AS decimal)), o.id_client, c.nom_client ,c.prenom_client
    FROM commandes o , public.client c 
    where  o.id_client =c.id_client
    GROUP BY o.id_client , c.nom_client   ,c.prenom_client
    order by  SUM(CAST(o.totalcommande AS decimal))  DESC
    limit 3
    `;

    const listclient = await pool.query(sql);
    res.json(listclient.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//chiffres d'affaires mensuels
app.get("/caMensuel", async (req, res) => {
  try {
    let sql = `
  SELECT
 commandes.date_cmd  AS Month ,
 to_char( commandes.date_cmd, 'yyyy/mm/dd') AS Date ,
	SUM(CAST(totalcommande AS decimal))
    FROM commandes
	  GROUP BY Month
	   ORDER BY date_cmd
    `;

    const chiffreAffaires = await pool.query(sql);

    let data = {
      data: [],
      labels: [],
    };

    for (const element of chiffreAffaires.rows) {
      data.labels.push(element.date);
      data.data.push(element.sum);
    }

    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = app;

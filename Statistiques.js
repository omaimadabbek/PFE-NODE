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

//chiffres affaires mensuels
app.get("/caMensuel", async (req, res) => {
  try {

    let sql = `
      SELECT
    * 
        FROM detail_commandes

        `;

    const chiffreAffaires = await pool.query(sql);

    let data = {
      data: [],
      labels: [],
      prix: [],
    };

    let array = [];

    for (const element of chiffreAffaires.rows) {
      let bb = Number(element.quantité) * Number(element.prix);
      array.push({
        des: element.designation,
        qte: element.quantité,
        prix: bb,
      });
    }
    const resultat = {};

    for (const produit of array) {
      if (resultat.hasOwnProperty(produit.des)) {
        resultat[produit.des].qte += produit.qte;
      } else {
        resultat[produit.des] = {
          des: produit.des,
          qte: produit.qte,
          prix: produit.prix,
        };
      }
    }

    const nouveauTableau = Object.values(resultat);
    nouveauTableau.sort((a, b) => b.qte - a.qte); // Trie les produits en fonction de la quantité (ordre décroissant)
    const cinqPlusGrands = nouveauTableau.slice(0, 5);

    cinqPlusGrands.forEach((el) => {
      data.labels.push(el.des);
      data.data.push(el.qte);
      data.prix.push(el.prix);
    });
    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = app;

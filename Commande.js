const express = require("express");
const pool = require("./db");
const app = express.Router();

// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");

// const CLIENT_ID =
//   "284565428368-su248oh2jgnssd0gfavg76gih9sfilig.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN =
//   "1//04x8K-OZ9TgJbCgYIARAAGAQSNwF-L9IrOTcl3pk16vM7965GEtb64qzi9H_6Mhv3AtGn68zyhQCIQy2VNmqaiO52yE_yQHFgimc";
// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
// const accessToken = oAuth2Client.getAccessToken();
// async function sendMail(
//   htmlData,
//   mail,
//   status,
//   transporterConfig = {
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: "omaymadabbek@gmail.com",
//       clientId: CLIENT_ID,
//       clientSecret: CLIENT_SECRET,
//       refreshToken: REFRESH_TOKEN,
//       accessToken: accessToken,
//     },
//   }
// ) {
//   const transporter = nodemailer.createTransport(transporterConfig);
//   const mailOptions = {
//     from: "RESTAURANT DABBEK " + transporterConfig.auth.user,
//     to: mail,
//     // cc :
//     subject: status ? "RESTAURANT DABBEK" : "RESTAURANT DABBEK",
//     text: htmlData,
//   };
//   return transporter.sendMail(mailOptions, function (err) {
//     if (err) {
//       console.log("Error", err);
//     } else {
//       console.log("Email sent !!!!!");
//     }
//   });
// }

//***create a commandes*/
app.post("/Commandes", async (req, res) => {
  try {
    const { date_cmd, totalcommande, id_client, etat_commande, mdv, adresse } =
      req.body;
    const date = new Date();
    const dateString = date.toISOString().substring(0, 10);
    const newCommandes = await pool.query(
      `INSERT INTO commandes (date_cmd,totalcommande,id_client,etat_commande,mdv,adresse)
        VALUES ('${dateString}','${totalcommande}','${id_client}','${etat_commande}','${mdv}','${adresse}') RETURNING id_commandes `
    );
    if (newCommandes.rowCount > 0) {
      res.json(newCommandes.rows[0]);
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
    const { etat_commande, idClient } = req.body;
    const updateCmd = await pool.query(
      `UPDATE commandes SET etat_commande='${etat_commande}'
             WHERE id_commandes=${id}`
    );
    const Client = await pool.query(
      `select * from client 
             WHERE id_client=${idClient}`
    );
    if (etat_commande === "1") {
      sendMail(
        "Bonjour " +
          Client.rows[0].nom_client +
          "" +
          Client.rows[0].prenom_client +
          ", Votre commade a été acceptée.",
        Client.rows[0].email,
        true
      );
    } else {
      sendMail(
        "Bonjour " +
          Client.rows[0].nom_client +
          "" +
          Client.rows[0].prenom_client +
          ", Votre commade a été refusée.",
        Client.rows[0].email,
        false
      );
    }
    res.json("Commande was update!");
  } catch (error) {
    console.error(error.message);
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

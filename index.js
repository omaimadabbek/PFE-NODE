const express = require("express"); //La première ligne référence / importe le module Express pour créer le serveur.
const app = express();
const multer = require("multer");
const cors = require("cors");
const pool = require("./db");
const Admin = require("./Admin");
const Client = require("./Client");
const Categorie = require("./Categorie");
const Produit = require("./Produit");
const Commande = require("./Commande");
const DetailCommande = require("./DetailCommande");

//middleware
app.use(cors());
app.use(express.json());

//***ROUTES
//**** Admin */
app.post(Admin);

app.use(express.static("images"));

//**** Client */
app.post(Client);

//**** Categorie */
app.post(Categorie);

//**** Produit */
app.post(Produit);

//**** Commande */
app.post(Commande);

//**** DetailCommande */
app.post(DetailCommande);

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

app.post(
  `/uploadImage`,
  imageUpload.array("imgCollection"),
  function (req, res) {
    const { originalname } = req.files[0];
    //return res
    //.status(200)
    //.json(`${process.env.REACT_APP_API_URL}/` + originalname);
    return res.status(200).json("http://localhost:5000/" + originalname);
    //  return res.status(200).json("http://192.168.2.83:5003/" + originalname);
  }
);

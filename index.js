const express = require("express");
const app = express();
const pg = require("pg");
const multer = require("multer");
const cors = require("cors");
const pool = require("./db");
const Admin = require("./Admin");
const Client = require("./Client");
const Categorie = require("./Categorie");
const Produit = require("./Produit");
const Commande = require("./Commande");
const DetailCommande = require("./DetailCommande");
const Statistiques = require("./Statistiques");

//****** Socket */

const ServerSocket = require("socket.io");
const server = require("http").createServer(app);

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Pass to next layer of middleware
  next();
});

const io = ServerSocket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
/***connexion base de donnee pour le sockrt */
const dbUrl = "postgresql://postgres:oma@localhost:5433/postgres";
const pgClient = new pg.Client(dbUrl);
pgClient.connect((err) => {
  if (err) {
    console.log("🚀  err:", err);
  }
});
/***socket connecte */
io.on("connection", async (socket) => {
  console.log("🚀 connection:");
  await pgClient.query("LISTEN watchers");
  io.emit("connection", socket.id);
  socket.once("ready for data", (data) => {
    pgClient.on("notification", async (data) => {
      console.log("🚀 notification");
      socket.emit("Nouvelle commande", {
        message: "",
      });
      socket.on("disconnect", () => {
        socket.disconnect();
      });
    });
  });
});

/**** */
//middleware
app.use(cors());
app.use(express.json());

//***ROUTES
//**** Admin */
app.use(Admin);

//***statistiques */
app.use(Statistiques);

//**** Commande */
app.use(Commande);

//**** Categorie */
app.use(Categorie);

//**** Produit */
app.use(Produit);

//**** DetailCommande */
app.use(DetailCommande);

//**** Client */
app.use(Client);

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

    return res.status(200).json(`http://192.168.2.22:5000/` + originalname);
  }
);

server.listen(5000, () => {
  console.log("Serveur démarré sur le port 5000");
});

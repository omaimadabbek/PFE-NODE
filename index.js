const express = require("express");
const app = express();
const multer = require("multer");
app.use(express.static("images"));
/////
app.get("http://localhost:5000/admin"),
  (req, res) => {
    res.json({ admins: ["adminOne", "adminTwo", "adminThree"] });
  };
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//create a admin
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
//get all admin
app.get("/admin", async (req, res) => {
  try {
    const allAdmin = await pool.query(`SELECT*FROM admin`);
    res.json(allAdmin.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get a admin
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

//update a admin
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
//delete a admin
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

//create a client
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
//get all client
app.get("/client", async (req, res) => {
  try {
    const allClient = await pool.query(`SELECT*FROM client`);
    res.json(allClient.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get a client
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

//update a client
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
//delete a client
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

//create a categorie

app.post("/categorie", async (req, res) => {
  try {
    const { nom_categorie, image } = req.body;
    const newCategorie = await pool.query(
      `INSERT INTO categorie (nom_categorie,image) VALUES ('${nom_categorie}','${image}') RETURNING* `
    );
    res.json(newCategorie);
  } catch (err) {
    console.error(err.message);
  }
});
//get all categorie
app.get("/categorie", async (req, res) => {
  try {
    const allCategorie = await pool.query(`SELECT*FROM categorie`);
    res.json(allCategorie.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get a categorie
app.get("/categorie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const categorie = await pool.query(
      `SELECT *FROM categorie WHERE id_categorie = ${id}`
    );
    res.json(categorie.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//update categorie
app.put("/categorie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nom_categorie, image } = req.body;
    const updateCategorie = await pool.query(
      `UPDATE categorie SET nom_categorie='${nom_categorie}',image='${image}'
            WHERE id_categorie=${id}`
    );
    res.json("categorie was update!");
  } catch (error) {
    console.error(err.message);
  }
});
//delete a categorie
app.delete("/categorie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategorie = await pool.query(
      `DELETE FROM categorie WHERE id_categorie = ${id}`
    );
    // await DeleteCategorieProduit(id)
    const deleteProduit = await pool.query(
      `DELETE FROM produits WHERE id_categorie = ${id}`
    );

    res.json("categorie was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

//create a produits

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

app.get("/produits", async (req, res) => {
  const date = new Date();
  try {
    const { id } = req.params;
    const produits = await pool.query(`SELECT * FROM produits  `);

    res.json(produits.rows);
  } catch (err) {
    console.error(err.message);
  }
});

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
//delete a produits
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
app.listen(5000, () => {
  console.log("server has started on port 5000");
});

//create a commandes

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

//update etat cmd
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
//get a commandes
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

// //get all commandes
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

    const newDetail = await pool.query(
      `INSERT INTO detail_commandes (date_detail_cmd,id_commandes,designation,quantité,prix,id_client)
             VALUES ('${date_detail_cmd}','${id_commandes}','${designation}','${quantité}','${prix}','${id_client}') RETURNING* `
    );
    res.json(newDetail);
  } catch (err) {
    console.error(err.message);
  }
});

//get a detail_cmd
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

//update a detail_cmd
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

CREATE TABLE admin(
    admin_id SERIAL PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    mot_de_passe VARCHAR(50),
    email VARCHAR(50),
    type VARCHAR (50)
);

CREATE TABLE categorie( 
    id_categorie SERIAL PRIMARY KEY,
    nom_categorie VARCHAR (50),
    image VARCHAR (200)
);

CREATE TABLE client(
    id_client SERIAL PRIMARY KEY,
    nom_client VARCHAR (50),
    prenom_client VARCHAR(50),
    email VARCHAR (50),
    mot_de_passe VARCHAR(50),
    num_telephone INT, 
    adresse VARCHAR (50)
);

CREATE TABLE commandes( 
    id_commandes SERIAL PRIMARY KEY,
    date_cmd date, 
    totalcommande VARCHAR(50),
    id_client INT, 
    etat_commande VARCHAR(50),
    mdv VARCHAR(50),
    adresse VARCHAR(50) 
);

CREATE TABLE detail_commandes( 
    id_detail SERIAL PRIMARY KEY,
    date_detail_cmd date,
    id_commandes INT,
    designation VARCHAR (50),
    quantité INT,
    prix FLOAT, 
    id_client INT
);

CREATE TABLE produits( 
    id_produit SERIAL PRIMARY KEY,
    id_categorie INT, 
    nom VARCHAR(50),
    prix VARCHAR (50),
    image VARCHAR (50),
    repture_de_stock VARCHAR (50),
    description VARCHAR (500)
);

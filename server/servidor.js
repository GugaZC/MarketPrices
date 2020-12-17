var express = require("express");
var bodyParser = require("body-parser");
var http = require("http");
var methodOverride = require("method-override");
var cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const sqlite = require("sqlite");

let db = new sqlite3.Database("../db/dataBase.db", (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connected to the in-memory SQlite database.");
    // createTables();
    // insertClients();
    // insertProducts();
    // dropTables();
});

const createTables = () => {
    db.run("CREATE TABLE client(id number, name text, discount number)");
    db.run("CREATE TABLE product(id number, name text, value number)");
};

    const insertClients = () => {
      db.run(`INSERT INTO client(id, name, discount) VALUES(1, "Gustavo", 50)`);
        db.run(`INSERT INTO client(id, name, discount) VALUES(2, "Julio", 40)`);
      db.run(`INSERT INTO client(id, name, discount) VALUES(3, "Guilherme", 30)`);
        db.run(`INSERT INTO client(id, name, discount) VALUES(4, "Thomas", 10)`);
        db.run(`INSERT INTO client(id, name, discount) VALUES(5, "Antonio", 5)`);
      db.run(`INSERT INTO client(id, name, discount) VALUES(6, "Christian", 2)`);
        db.run(`INSERT INTO client(id, name, discount) VALUES(7, "Fabio", 1)`);
};

const insertProducts = () => {
    db.run(
        `INSERT INTO product(id, name, value) VALUES(1, "Oculos de sol", 250)`
    );
    db.run(`INSERT INTO product(id, name, value) VALUES(2, "Pinho sol", 17)`);
    db.run(`INSERT INTO product(id, name, value) VALUES(3, "Guarda sol", 100)`);
    db.run(
        `INSERT INTO product(id, name, value) VALUES(4, "Protetor contra sol", 50)`
    );
    db.run(`INSERT INTO product(id, name, value) VALUES(5, "Para sol", 22)`);
    db.run(`INSERT INTO product(id, name, value) VALUES(6, "Pos sol", 40)`);
    db.run(`INSERT INTO product(id, name, value) VALUES(7, "Gira sol", 8.87)`);
};

const dropTables = () => {
    db.run("DROP TABLE client;");
    db.run("DROP TABLE product;");
};

var app = express();

async function getProduct(id) {
    try {
        const db = await sqlite.open({
            filename: "../db/dataBase.db",
            driver: sqlite3.Database,
        });

        const product = await db.all(`SELECT * FROM product WHERE id = ${id}`);
        await db.close();

        return product;
    } catch (error) {
        console.log(error);
    }
}

async function updateDiscount(client){
    try {
         const db = await sqlite.open({
            filename: "../db/dataBase.db",
            driver: sqlite3.Database,
        });
        db.all(`UPDATE client SET discount = ${client.discount+1} WHERE id = ${client.id}`);    
        
        
    } catch (error) {
        console.log(error)
    }
}

async function getClient(name) {
    try {
        const db = await sqlite.open({
            filename: "../db/dataBase.db",
            driver: sqlite3.Database,
        });

        const client = await db.all(
            `SELECT * FROM client WHERE name = "${name}"`
        );

        await db.close();

        return client;
    } catch (error) {
        console.log(error);
    }
}

app.use(cors()); //normal CORS

app.options("*", cors()); //preflight
app.use(methodOverride("X-HTTP-Method"));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(methodOverride("X-Method-Override"));
app.use(methodOverride("_method"));

app.use(bodyParser.json());

app.get("/product/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await getProduct(productId);
    res.send(product[0]);
});

app.get("/client/:name", async (req, res, params) => {
    const clientName = req.params.name;
    const client = await getClient(clientName);

    res.send(client[0]);
});

app.get('/client/update/:name', async(req, res) => {
    const {name} = req.params;
    const client = await getClient(name);
    
    if(client[0].discount<=50){
        await updateDiscount(client[0]);
        const newClient = await getClient(client[0].name);
        res.send(newClient[0]);

    }else{

        res.send(client[0]);
    }
})

app.listen(7000);

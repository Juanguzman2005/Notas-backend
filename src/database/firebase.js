const admin = require("firebase-admin");
const path = require("path");
const YAML = require("yamljs");

// Cargar configuración YAML (para demostrar uso de YAML)
const config = YAML.load(path.join(__dirname, "..", "..", "config.yml"));

const serviceAccount = require("../../firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = {
  admin,
  db,
  config
};

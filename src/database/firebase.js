const admin = require("firebase-admin");
const path = require("path");
const YAML = require("yamljs");

// Cargar configuración YAML (para demostrar uso de YAML)
const config = YAML.load(path.join(__dirname, "..", "..", "config.yml"));

const admin = require("firebase-admin");

if (!admin.apps.length) {
  const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!serviceAccountStr) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT no está configurada en variables de entorno");
  }

  const serviceAccount = JSON.parse(serviceAccountStr);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

module.exports = { admin, db };

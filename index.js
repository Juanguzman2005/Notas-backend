const express = require("express");
const bodyParser = require("body-parser");
const soap = require("soap");
const fs = require("fs");
const http = require("http");
const cors = require("cors");
const path = require("path");

const { config } = require("./src/database/firebase");

// Crear app de Express
const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Pequeño endpoint REST solo para probar que el servidor está vivo
app.get("/", (req, res) => {
  res.json({
    message: "Backend de notas funcionando. API principal por SOAP en /soap",
  });
});

// Cargar servicio SOAP
const soapService = require("./src/soap/service");
const wsdlPath = path.join(__dirname, "src", "soap", "service.wsdl");
const wsdlXml = fs.readFileSync(wsdlPath, "utf8");

// Crear servidor HTTP y conectar SOAP
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
  soap.listen(server, "/soap", soapService, wsdlXml);
  console.log(`Servidor escuchando en puerto ${PORT}`);
});


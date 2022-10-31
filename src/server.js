import express, { Router }  from 'express';
import morgan from 'morgan'
import cors from 'cors'
import history from 'connect-history-api-fallback'
import  path from "path";
import bodyParser from "body-parser";
import localeMiddleware from "express-locale";
import { fileURLToPath } from 'url';

import envar from "./config/envar.js";
import db from "./db.js";
import routes from "./routes/index.js";

// check connection
db.once("open", () => {
  console.log(`Connnected to mongodb`);
});
db.on("error", (err) => {
  console.log(err);
});







const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const router = Router();

//Nos sirve para pintar las peticiones HTTP request que se solicitan a nuestro aplicación.
app.use(morgan('tiny'));
//Para realizar solicitudes de un servidor externo e impedir el bloqueo por CORS
app.use(cors());
app.options("*", cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

app.use(localeMiddleware());



app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use("/", routes);
app.get('/', function (req, res) {
  res.send('Hello World!');
});
// Middleware para Vue.js router modo history
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));





export default app;

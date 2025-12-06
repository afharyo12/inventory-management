import express, { response } from "express";
import cors from "cors";
import router from "./routes/Route.js";
import bodyParser from "body-parser"
import path from 'path';
import {fileURLToPath} from 'url';
import { dirname } from 'path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.listen(5000, () => console.log("Backend server connected"));
/*
app.get('/homenote', (req,res) => {
    res.render('home');
})*/


const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");


const app = express();

app.use(express.json());
app.use(cors(["*"]));

const port = 80;

app.get("/", (req, res) =>{
    res.send("Ola!!!");
})

let contadorA = 0;
let animals =[];
app.post("/animais", (req, res)=>{
  const newAnimal = {
    id: contadorA++,
    nome: req.body.nome,
    raca: req.body.raca,
  };
  animals.push(newAnimal);
  res.status(201).json(newAnimal);
})


const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, `${__dirname}/public`)
  },
  filename: function(req, file, cb){
    cb(null, Date.now() +".jpg");
  }
});

const upload = multer({storage}).single("file");

app.post("/upload", (req, res)=>{
  upload(req, res, (err)=>{
    if (err instanceof multer.MulterError){
      return res.status(500).send(err);
    }else if (err){
      return res.status(500).send(err);
    }
    console.log(req.file.filename);

    return res.status(200).send({message: "Upload realizado com sucesso!"})
  });
});

app.get("/animais", (req, res) => {
  res.json(animals);
});

app.listen (port, ()=>{
    console.log(`servidor iniciado com sucesso na porta ${port}`);
});
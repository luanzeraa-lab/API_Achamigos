const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors(["*"]));

const port = 80;

app.get("/", (req, res) =>{
    res.send("Ola!!!");
})

app.listen (port, ()=>{
    console.log(`servidor iniciado com sucesso na porta ${port}`);
});
const express = require("express");
const app = express();
const admin = require("./routes/admin");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const handlebars = require('express-handlebars');
const helpers = require('handlebars-helpers')();

//*Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine','handlebars');

//*Body-parser 
//Serve para receber os dados do formulário em formato json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//*Conexao com o banco de dados
mongoose.connect("mongodb://localhost/pessoas", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Conexão com o banco de dados realizada com sucesso");
}).catch((error)=>{
    console.log("Erro na conexão com o banco de dados: "+error);
});
                    
//*Rotas
app.use('/',admin);

app.listen(8082,()=>{
    console.log("Servidor rodando na porta 8082");
});


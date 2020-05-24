const mongoose = require("mongoose");

//Cria a collection Pessoa
const Pessoa = new mongoose.Schema({
    nome: {
        type: String,
        required: true      //Conteúdo obrigatório! 
    },
    cpf:{
        type: String,
        required: true
    },
    data_de_nascimento:{
        type: Date,
        required: true
    },
},
{
    timestamps:true    //Cria automaticamente o created_at e updated_at
});

mongoose.model('pessoa', Pessoa); //Exportando a constante 'Pessoa' com o nome de 'pessoa'
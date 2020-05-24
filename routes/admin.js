const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


//*Importando o model Pessoa
require('../models/Pessoa');
const Pessoa = mongoose.model('pessoa'); //'pessoa' é o nome dado na exportação do model


router.get('/',(req,res)=>{
    res.sendFile('/views/index.html',{root: './'});
});

router.get('/paginaCadastro',(req,res)=>{
    res.render('cadastro');
});

router.get('/paginaLista',(req,res)=>{
    //O NodeJS já sabe que deve utilizar o handlebars, pois foi dito no view engine no arquivo app.js
    Pessoa.find().then((pessoas)=>{
        res.render('pessoas', { pessoas: pessoas.map(pessoa=> pessoa.toJSON()) } );
    }).catch((error)=>{
        res.send("Erro ao listar as pessoas: "+error);
    });
    
});

router.get('/deletar/:id',(req,res)=>{
    Pessoa.findOneAndDelete({_id:req.params.id}).then(()=>{
        res.redirect('/paginaLista');
    }).catch((error)=>{
        res.send("Erro ao deletar a pessoa: "+error);
    });
});

router.get('/editar/:id',(req,res)=>{
    
    Pessoa.findOne({_id: req.params.id}).lean().then((pessoa)=>{
        res.render('edicao', {pessoa: pessoa});
    }).catch((error)=>{
        res.send("Erro ao editar a pessoa: "+error);
    });
    
});

router.post('/cadastrar',(req,res)=>{
    const novaPessoa = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        data_de_nascimento: req.body.data_de_nascimento
    };
    new Pessoa(novaPessoa).save().then(()=>{
        res.redirect('/paginaCadastro');
    }).catch((error)=>{
        res.send("Erro ao cadastrar uma nova pessoa: "+error);
    });
});

module.exports =router;
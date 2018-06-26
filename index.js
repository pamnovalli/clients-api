const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectID = require('mongodb').ObjectID;

const app = express();

app.use(expressMongoDb('mongodb://loja:loja123@165.227.221.155/loja'));

app.use(bodyParser.json());
app.use(cors());

app.post('/cadastrocliente', (req, res) => {
    let cadastrocliente = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        endereço: req.body.endereço,
        telefone: req.body.telefone
    };

    req.db.collection('loja').insert(cadastrocliente, (err) => {
        if(err){
            res.status(500).send();
            return;
        }
    
        res.send(req.body);
    });

});

app.put('/cadastrocliente/:cpf', (req, re) => {
    let query = {
        _cpf: ObjectID(req.params.cpf)
    };

    let cadastrocliente = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        endereço: req.body.endereço,
        telefone: req.body.telefone
    };

    req.db.collection('loja').updateOne(query, cadastrocliente, (err, data) => {
        if(err){
            res.status(500).send();
            return;
        }
    
        res.send(data);
    });
});

app.get('/cadastrocliente', (req, res) => {
    req.db.collection('loja').find().toArray((err, data) => {
        if(err){
            res.status(500).send();
            return;
        }
        res.send(data);
    });
});


app.get('/cadastrocliente/:cpf', (req, res) => {
    let query = {
        _cpf: ObjectID(req.params.cpf)
    };

    req.db.collection('loja').findOne( query, (err, data) => {
        if(err){
            res.status(500).send();
            return;
        }
        res.send(data);
    });
});


app.listen(process.env.PORT || 3000, () => console.log('Aplicação iniciada'));

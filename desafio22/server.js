//express
const express = require('express');
//App en express
const app = express();
//Ruta a productos
const products = require('./routes/productos.route');
//Ruta a productos
const mensajes = require('./routes/mensajes.route');
//Cors
const cors = require('cors');
const Connection = require('./database/Connection')

app.use(cors({origin:'*'}));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));

//Ruta a productos
app.use('/productos', products);
app.use('/mensajes', mensajes);

//Uso del static
app.use(express.static('public'));

//app en el Servidor
const server = app.listen(8080, ()=>{
    console.log('Servidor escuchando en el puerto 8080');
});

Connection();

//Manejo de error del servidor
server.on('error', error =>{
    res.json({error: -2, descripcion: 'Ruta con método con implementada'}, error);
});
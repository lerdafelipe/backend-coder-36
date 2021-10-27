//express
const express = require('express');
//App en express
const app = express();
//Routes
const products = require('./routes/productos.route');
const sessionRoute = require('./routes/session.route');
const Connection = require('./database/Connection');

const session = require('express-session');
app.use(session({
    secret: 'manolito',
    resave: true, 
    saveUninitialized: true
}));
const cors = require('cors');
app.use(cors({origin:'*'}));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
Connection();

//routes
app.use('/productos', products);
app.use('/session', sessionRoute);

//app en el Servidor
const server = app.listen(8080, ()=>{
    console.log('Servidor escuchando en el puerto 8080');
}); 

//Manejo de error del servidor
server.on('error', error =>{
    res.json({error: -2, descripcion: 'Ruta con método con implementada'}, error);
});
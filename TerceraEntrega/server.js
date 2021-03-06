const express = require('express');
const app = express();
//Routes
const products = require('./routes/productos.route');
const mensajes = require('./routes/mensajes.route');
const info = require('./routes/info.route');
const auth = require('./routes/auth.route');

//Function connection database
const Connection = require('./database/Connection');
Connection();

//Compression
const compression = require('compression');
app.use(compression());

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const mongoStore = require('connect-mongo');
//
const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const session = require('express-session');
app.use(session({
    store: mongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/ecommerce',
        mongoOptions: advanceOptions,
        ttl: 3000
    }),
    secret: 'manolito',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}));

//Cors
const cors = require('cors');
app.use(cors({ origin: '*' }));

//express extensions
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//routes
app.use('/productos', products);
app.use('/info', info);
app.use('/mensajes', mensajes);
app.use('/auth', auth);

//Passport
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

//Port
const PORT = parseInt(process.argv[2]) || 8080;

//Server
const server = app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto 8080');
});

//Manejo de error del servidor
server.on('error', error => {
    res.json({ error: -2, descripcion: 'Ruta con método con implementada' }, error);
});
const express = require('express'),
    session = require('express-session'),
    bodyParse = require('body-parser'),
    mongoose = require('mongoose'),
    FileStore = require('session-file-store')(session),
    livereload  = require("connect-livereload"),
    database = 'MyApp',
    port = 8080;

const app = express();

app.use('/css', express.static(__dirname + '/view/css'));
app.use('/js', express.static(__dirname + '/view/js'));
app.use(bodyParse.urlencoded());
app.use(bodyParse.json());
const SessionOption = {
    name: 'my.connect.sid',
    secret: 'keyboard cat',
    cookie: {
        maxAge: 2628000000
    },
    resave : true,
    saveUninitialized : true,
    store: new FileStore({
        path: __dirname + '/tmp',
        host: 'localhost', // optional 
        port: port // optional 
    }),
};
app.use(session(SessionOption));
// app.use(livereload());
var UserRouter = require('./route/userRouter');
var ProductRouter = require('./route/productRouter');
var CartRouter = require('./route/cartRouter');
app.use(UserRouter);
app.use(ProductRouter(express));
app.use(CartRouter(express));

// database config
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/${database}`, (err) => {
    console.log('connected db')
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("we're connected to collection: " + database);
});

app.listen(port, () => {
    console.log('listen on port: ' + port);
});
const express = require('express'),
    session = require('express-session'),
    bodyParse = require('body-parser'),
    mongoose = require('mongoose'),
    FileStore = require('session-file-store')(session),
    database = 'MyApp',
    port = 8080;

const app = express();

app.use(bodyParse.urlencoded());
const SessionOption = {
    name: 'my.connect.sid',
    secret: 'keyboard cat',
    cookie: {
        maxAge: 2628000000
    },
    // resave: true,
    saveUninittialized: true,
    store: new FileStore({
        path: __dirname + '/tmp',
        host: 'localhost', // optional 
        port: port // optional 
    }),
};
app.use(session(SessionOption));

var UserRouter = require('./route/userRouter');
app.use(UserRouter);

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
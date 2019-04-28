const express  = require('express');
const app      = express();
const port     = process.env.PORT || 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');

const configDB = require('./config/database.js');

mongoose.connect(configDB.url, { useNewUrlParser: true});

app.use(morgan('dev'));
app.use(cookieParser()); 
app.use(bodyParser()); 

app.set('view engine', 'ejs'); 

app.use(express.static('public'));
app.use(session({ secret: 'superdupersecret' }));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

require('./config/passport')(passport);
require('./routes.js')(app, passport);

io.on("connection", function(socket){
    console.log("new registrar");
    socket.on("classChange", function(option){
        console.log("classChange")
        if (option === "na") return;

        let classes = {
            1: 0,
            2: 0,
            3: 0,
            4: 0
        };
        classes[option] = parseInt(classes[option])+1;
        console.log(classes[option])
        if(classes[option] === 2) {
            return console.log("full")
        }
    })
})

http.listen(port);
console.log('The magic happens on port ' + port);

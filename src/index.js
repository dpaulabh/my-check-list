const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
//const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// Initiliazations
const app = express();
require('./database');
require('./config/passport');

//Helpers
const igualHelper  = function(arg1, arg2) {
    return (arg1 == arg2);
};

// Config
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers : {
        igual : igualHelper
    },
    runtimeOption : {
        allowProtoPropertiesByDefault : true,
        allowProtoMethodsByDefault : true,
        allowProtoProperties : true,
        allowProtoMethods : true,
        allowInsecurePrototypeAccess : true        
    }
}))
app.set('view engine', '.hbs');



// Middlewaes
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.usuario = req.user || null;
    next();
})

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/lists'));
app.use(require('./routes/users'));
app.use(require('./routes/tasks'))

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Server listenning
app.listen(app.get('port'), () => {
    console.log('Servidor inicializado na porta ', app.get('port'));
});



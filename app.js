require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const connectDB = require('./server/config/db');

const app = express();
const port = 5000 || process.env.PORT;

// Connect to Database
connectDB();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(methodOverride('_method'));

//static files
app.use(express.static('public'));

//Express Seesion
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 1 week
    })
);

//Flash messages
app.use(flash({ sessionKeyName: 'flashMessage '}));

//Templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./server/routes/customer'))

//Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})



// # Suyash05

// # MONGODB_URI=mongodb://localhost:27017/ums
// # MONGODB_URI=mongodb://localhost:27017/NodeJsUserManagementSystem
// # MONGODB_URI=mongodb://SuyashGautam05:lNe3s4FmooIuOzYG@cluster0.opmol.mongodb.net/ums?retryWrites=true&w=majority

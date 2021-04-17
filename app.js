// include express
const express = require('express');
require('dotenv').config();
// include mongoose
const mongoose = require('mongoose');
let port = process.env.PORT || 3000;
// include bodyparser
let bodyParser = require('body-parser');

// include method-override
let methodOverride = require('method-override');
const { stringify } = require('querystring');

// import authRoutes
const authRoutes = require('./routes/authRoutes');

const projectRoutes = require('./routes/projectRoutes');

const arenaRoutes = require('./routes/arenaRoutes');

const profileRoutes = require('./routes/profileRoutes');

const jobinternRoutes = require('./routes/jobinternRoutes');

// include cookieParser
const cookieParser = require('cookie-parser');

// import auth-checkers
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// fire express
const app = express();

// middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

mongoose.set('useFindAndModify', false);
let urlencodedParser = bodyParser.urlencoded({ extended: false });

// view engine
app.set('view engine', 'ejs');

// connect to database 
let url=process.env.MONGODB;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true  })



// Confirmation of listening of server
console.log('you are listening to port 3000');

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/home', (req, res) => res.render('home'));
app.get('/geeks', (req, res) => res.render('geeks'));

// using controller scripts
app.use(authRoutes);
app.use(arenaRoutes);
app.use(jobinternRoutes);
app.use(projectRoutes);
app.use(profileRoutes);

// Listening to server
app.listen(port);
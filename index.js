const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const methodOverride=require('method-override');

app.use(methodOverride((req, res) => {
    if (req.body && req.body._method){
      const method = req.body._method;
      return method;
    }
}))

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res, next) => {
    const username = req.cookies.username || '';
    res.locals.username = username;
    next();
})


app.get('/',(req,res)=>{
    res.redirect('/clucks');
})

const signRouter = require('./routes/sign')
app.use('/',signRouter);

const clucksRouter = require('./routes/clucks')
app.use('/clucks',clucksRouter);


const DOMAIN = 'localhost';
const PORT = 5000;
app.listen(PORT, DOMAIN, () => {
  console.log(`Server is listening on http://${DOMAIN}:${PORT}`);
});
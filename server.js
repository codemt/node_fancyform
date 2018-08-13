const express = require('express');
const bodyParser = require('body-parser');
var path= require("path");
const exphbs = require('express-handlebars');
const app = express();

// view engine setup.
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

// static folder.
app.use('/public',express.static(path.join(__dirname,'public')));

//body parser middelware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/',(req,res)=> {

    res.render('index');

});


const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{

    console.log('Server listening on port ${PORT}');

});
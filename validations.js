const express=require('express');
const routes=require('./routes/api');
const bodyParser=require('body-Parser');
//set up express app
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set view engne to ejs
app.set('view engine','ejs');

//initialize routes
app.use('/api',routes);


app.listen(3000,function(){
console.log('listening!');
});
const express=require('express');
const hbs =require('hbs');
const fs = require('fs');

var app =express();

hbs.registerPartials(__dirname+'/views/partials'); //adding partial part of the website
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log('Not able to append');
    }
  });
  next();
});


app.use(express.static(__dirname+ '/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})
// app.get('/',(req,res)=>{
  //res.send('<h1>Hello Express !</h1>');
//   res.send({
//     name:'Prashant',
//     likes:[
//       'Ra',
//       'Aa'
//     ]
//   });
// });
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage:'Welcome to my website',

  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',

  });
});
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Error'
  });
})
app.listen(3000,()=>{
  console.log('Server Started');
});

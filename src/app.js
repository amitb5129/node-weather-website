const express = require('express')
const path = require('path');
const hbs = require('hbs')
const geocode = require('../src/utlis/geocode.js')
const forecast = require('../src/utlis/forecast.js')
const fs = require('fs');


const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname,'../templates/views');
const partialssPath = path.join(__dirname,'../templates/partials');
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialssPath);
app.use(express.static(path.join(__dirname,'../public')));

app.get('',(req,res)=>{
    res.render('index',{title : "Weather",name : "Amit Baghel"});
})

app.get('/about',(req,res)=>{
    res.render('about',{title : "About",name : "Amit Baghel"});
})


app.get('/help',(req,res)=>{
    res.render('help',{title : "HELP!",name : "Amit Baghel"});
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : "You Must Provide a Search Term"
        })
    }

    geocode(req.query.address,(error,response)=>{
        if(response!=undefined){
        forecast(response.body.features[0].center[1],response.body.features[0].center[0],(error,response)=>{
            return res.send({
                Location : response.location.name,
                Temperature : response.current.temperature,
                Forecast : response.current.feelslike,
                ExpectedWeather : response.current.weather_descriptions[0],
                Image : response.current.weather_icons[0]
            });
        });
    }else{
        res.send({error});
    }
    });
})

app.get('/products',(req,res)=>{
    //Now we need to make Search as a required Parameter
    if(!req.query.search){
        return res.send({
            error : "You Must Provide a Search Term"
        })
    }
    console.log(req.query);
    res.send(req.query);
});

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        errorMessage : "Help Article not Found",
        name : "Amit Baghel"
    })
})

app.get('*',(req,res)=>{
    res.render('404page',{
        errorMessage : "Page Not Found",
        name : "Amit Baghel"
    });
})

app.listen(port,()=>{
    console.log('Server is up on port'+ port);
});
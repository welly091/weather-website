const express = require('express') //express is a function
const path = require('path')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')


const app = express() 
const port = process.env.PORT || 3000 //If process.env.PORT is not working, use 3000(local)

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handelbar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //static() takes the path to the folder we want to serve up

app.get('',(req, res) =>{
    res.render('index',{
        title: 'Weather',
        name:'Welly'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title:'Help'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About'
    })
})

app.get('/weather', (req,res,next) =>{
    if(!req.query.address){
        res.send({
            error:'Please provide an address'
        })
    }
    geocode(req.query.address, (error,{latitude, longtitude, location} = {}) => {
        if(error) return res.send({error});
        forecast(latitude, longtitude, (error, forecastData) =>{
            if(error) return console.log(error);
            res.send({
                location: location,
                temperature: forecastData
            })
        })
    
    })
})

app.get('/products', (req,res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404',
        name: 'Welly',
        errorMessage: 'Help article not found.'
    })
})

//If none of webpage is found.
app.get('*',(req,res) =>{
    res.render('404',{
        title:'404',
        name: 'Welly',
        errorMessage: 'Page not found.'
    })
})



app.listen(port, () => {
    console.log('Server is up on port '+ port)
})





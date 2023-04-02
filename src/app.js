const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

// Setup static Directory to Serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anshuman Pati'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Anshuman Pati'

    })
    
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anshuman Pati'

    })
})

app.get('/weather',(req,res) => {

    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }
    
    geocode(req.query.address, (error,{latitude,longitude,location,country} = {}) => {
    if(error) {
        return res.send({ error })
        }

    forecast(latitude,longitude, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            forecast : forecastData,
            location,
            address: req.query.address,
            country : country
        })
    })
})
})



app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: ' you must provide a search term '
        })

    }
    res.send({
        products: []
    })
})

app.get('*',(req,res) => {
    res.render('404',{
       title: '404',
       name: 'Anshuman Pati',
       error: 'Error! 404 '
    })
})








app.listen(3000, () => {
    console.log('Server is up on Port 3000')
})
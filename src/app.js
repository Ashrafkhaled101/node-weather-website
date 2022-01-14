const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000
//define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static dir to server
app.use(express.static(path.join(__dirname,'../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'ashraf'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About!',
        name: 'ashraf'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        msg: 'send help please',
        name:'ashraf',
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
             error: 'please you must provide an address',
        })
    }


    geocode(req.query.address, ( error, { place_name, latitude, longitude } = {} ) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, weather_data) => {
            if(error) {
                return res.send({
                    error
                })
            }
            console.log(error, place_name, latitude, longitude)
            res.send(
                {
                    place_name,
                    latitude,
                    longitude,
                    weather: weather_data,
                }
            )
        })
    })


})

app.get('/help/*', (req,res) =>{
    res.render('error404',{
        errorMsg: 'help not found ~~!',
        name: 'ashraf'
    })
})


app.get('*', (req, res) => {
    res.render('error404',{
        errorMsg: '404 not found ~~!',
        name: 'ashraf'
    })
})

app.listen(port, () => {
    console.log('server is running at ', port);
})
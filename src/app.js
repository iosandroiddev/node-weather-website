const _geoLocation = require('./utils/geolocation')
const _forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
/**
 * Define Paths for Express Config
 */
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

/**
 * Setup handlebars engine and views location
 */
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

/**
 * Setup Static Directory to Serve
 */
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Manohar'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Manohar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Hey, hello this is a Help message.',
        title: 'Help',
        name: 'Manohar'

    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must specify an address.'
        })
    }

    _geoLocation(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        } else {
            _forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                } else {
                    res.send({
                        address: req.query.address,
                        location,
                        forecast: forecastData

                    })
                }
            })

        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Manohar',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Manohar',
        errorMessage: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is Up on port:3000')
})
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express(); //configure server

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath); //by default folder name => views & it is customized to templates/views
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

//req -> requested data
//res -> response to the request
// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>');
// });

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abhay Vibhute'
    }); // render hbs file
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abhay Vibhute'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Abhay Vibhute'
    });
});

app.get('/weather', (req, res) => {
    console.log('hi', req.query.address);

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (err, {
        lat,
        long,
        location
    } = {}) => {
        if (err) {
            return res.send({
                err
            });
        }
        forecast(lat, long, (error, data) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: data,
                location,
                address: req.query.address
            });
        })
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Abhay Vibhute'
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        product: []
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'My 404 page',
        name: 'Abhay Vibhute'
    });
})

//start server
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
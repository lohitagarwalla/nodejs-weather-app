const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('postman-request')
const geocode = require('./geocode')
const forecast = require('./forecast')

const app = express()

// console.log(__dirname)    
//bellow line is used to create a path to public folder which is used to keep css html and js files
const publicDirPath = path.join(__dirname, '\..\\public') // __dirname + '\\..\\public'
const partialsPath = path.join(__dirname, '\..\\templates\\partials') // create path to partials which is used to keep headers and footers. These are created by using handlebars (hbs). for using hbs we use file extension of .hbs instead of .html
const viewsPath = path.join(__dirname, '\..\\templates\\views') //path to views folder

//setup static directory to serve
app.use(express.static(publicDirPath))   //whatever files in public folder can be used 
app.set('views', viewsPath)         // to use files in views folder we need to determine where "views" folder is.   // setting path to templates folder that will contain .hbs files (if we name it "views" then we dont need to set path for it as handlebars knows to look inside views)
app.set('view engine', 'hbs')

hbs.registerPartials(partialsPath)   // to set path for partials ie. headers and footers


app.get('', (req, res) => {
    if(!req.query.address) {         // this statement will look for address in the link in browser. Eg: (localhost:3000/address=noida)         
        return res.send('Error! Please provide address')
    }

    const city = req.query.address
    return geocode(city, (error, data) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(data.latitude, data.longitude, (city, temperature, time) => {
            res.send({
                city,
                temperature,
                time
            })
            // console.log(city)
            // console.log(' -temperature', temperature)
            // console.log(' -Recorded at', time)
        })
    })
    res.render('index', {
        title: 'Weather app',
        name: 'Lohit Agarwalla'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help App',
        name: 'Lohit Agarwalla'
    })
})

app.get('/aboutpage', (req, res) => {  //name of the page from which we want to grab in browser
    res.render('about', {           // name of the file. Omit .hbs
        title: 'About page',
        name: 'Lohit Agarwalla'
    })
})

app.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send('Error! Search query is not defined')
    }

    res.send({
        product: ['apple']
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help follow up not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Given url is not found'
    })
})



// app.con
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up in port 3000')
})
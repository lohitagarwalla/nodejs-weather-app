const request = require('postman-request')

const foreCast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=616d51e6f314f49c541e6def9d25b11a&query=' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            console.log('Cannot connect to location service', error)
        } else if (!response.body.current) {
            console.log('Please enter correct location')
        } else {
            const record = response.body.current
            const loca = response.body.location
            callback(loca.name + ', ' + loca.region + ', ' + loca.country, record.temperature, record.observation_time)
        }
    })
}

module.exports = foreCast
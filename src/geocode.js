const request = require('postman-request')

const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibG9oaXRhZ2Fyd2FsbGEiLCJhIjoiY2trNzUxZGg0MDkxcTJwbWhsbjVjcXRwZCJ9.aiRidUyJJTj-GE2mW-7Tag'
    
    request({ url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to location service') // no need to pass the 2nd argument. Javascript will automatically assin undefined to it
        } else if (!response.body.features) {
            callback('Unable to find location. Try with a different location')
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try with a different location')
        } 
        else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports = geocode
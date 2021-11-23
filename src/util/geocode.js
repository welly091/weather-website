const request = require('postman-request')

const geocode = (address, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?limit=1&access_token=pk.eyJ1Ijoia2lja2Fzc3dlbGwiLCJhIjoiY2tlbHo5dnd3MDBidzJ0bXpmMTNtYnV6ayJ9.5JdzLxPJEb4HTl2kvieOvA&limit=1"
    request({url: url, json: true}, (error,response) =>{
        if(error) {
            callback('Unable to connect to location services.', undefined)
        }else if(response.body.features.length == 0){
            callback('Unable to find location. Try another search.',undefined)
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[1].toFixed(3),
                longtitude: response.body.features[0].center[0].toFixed(3),
                location: response.body.features[0].place_name
            })
        }
    })
}



module.exports = geocode
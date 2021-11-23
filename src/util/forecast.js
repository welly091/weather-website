const request = require('postman-request')

const forecast =(lat,long, callback) =>{
const url = "http://api.weatherstack.com/forecast?access_key=922886bc5d7b262ee43fc13f2935f36f&hourly=1&query="+lat+ "," +long
    request({url:url, json:true}, (error,response) => {
        if(error){
            callback('Unable to conenct to location services.', undefined)
        }else if(response.body.success==false){
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined, {
                summary: "The temperature in "+ response.body.location.name + " is " + response.body.current.temperature + " C"
            })
        }
    })
}

module.exports = forecast
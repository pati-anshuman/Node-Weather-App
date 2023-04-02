
const request = require('postman-request')

const geoCode = (address,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9144cbdd4b3386c20460878694606752&query='+address ;
    request({url:url, json:true}, (error,response) => {
        if(error) {
            callback('Unable to Connect to Weather Service',undefined)
        }
        else if(response.body.error) {
            callback('Unable to find location',undefined)
        }
        else {
            //callback(undefined,response.body.current.weather_descriptions+' Currently Temperature is ' + response.body.current.temperature + ' Feels Like '+response.body.current.feelslike)
            callback(undefined, {
                latitude: response.body.location.lat,
                longitude: response.body.location.lon,
                location: response.body.location.name,
                country: response.body.location.country 
            })
        }
    })
}

module.exports = geoCode
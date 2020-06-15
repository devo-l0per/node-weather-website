const request = require('request')

const foreCast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d73b93121406ed73ca217ad305921584&query='+latitude+','+longitude+ '&units=f#'
    request({ url, json: true }, (error, {body}) => {
    if(error) {
        callback('unable to connect',undefined)
    }else if (body.error){
        callback('unable to find location',undefined)
    }else {
        callback(undefined,'It is currently ' + body.current.temperature + ' degrees fahrenheit. There is a ' + body.current.precip + '% chance of rain. weather is ' + body.current.weather_descriptions

        )
    }
})
}

module.exports = {foreCast}








const request = require('request')
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGV2b2x1dGlvbml6ZXIiLCJhIjoiY2tiNHV2c2t0MHl0cTJ0czdzc2ZlbHg5NyJ9.tYQ0mQ0r59LrzrsZt4BEDg&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to location services', undefined)
        }
        else if (body.features.length === 0) {
            callback('unable to find location. Try another search', undefined)

        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }





    })
}



module.exports = {geoCode}
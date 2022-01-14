const request = require('request')

const forecast = (la , lo, callback ) => {
    const url = 'http://api.weatherstack.com/current?access_key=2553852097137e14d54f826ef5269e71&query='+la+','+lo+''
    request( {
        url,
        json: true,
    } , (e, { body }) => {
        if(e) {
            callback('service is unavailable', undefined)
        } else if (body.error) {
            callback('unable to find the location', undefined)
        } else {
            const {weather_descriptions, temperature, feelslike} = body.current
            callback(undefined, weather_descriptions[0] + ' and the current temperature '+ temperature+' C but it feels like '+ feelslike+ ' C')
        }
    })
}

module.exports = forecast
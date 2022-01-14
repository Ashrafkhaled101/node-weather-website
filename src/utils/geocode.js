const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYXNocmFma2hhbGVkIiwiYSI6ImNreTV4aHd5NzBlNWsycHJ2ZzJpY3Z4MjgifQ.4J3gN4mmnmn6MTgX8PTiLA&limit=1'

    request({
        url,
        json: true
    }, (e, {body}) => {

        if (e) {
            callback("service is unavailable",undefined)
        } else if (body.features.length === 0) {
            callback("Geocoding unable to find the location", undefined)
        } else {
            callback(undefined,{
                place_name: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
            })
        }
    })
}

module.exports = geoCode

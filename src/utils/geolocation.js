const _postmanRequest = require('postman-request')


const _getGeoLocation = (address, locationCallback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?&limit=1&access_token=pk.eyJ1IjoicGVyZXBhbWFub2hhciIsImEiOiJja2I5aG5hNncwYWE2MnFubGU4eWJjMXJvIn0.0ptGsMjjcY-soVLp8j0ENw'

    _postmanRequest({ url, json: true }, (error, { body }) => {
        if (error) {
            locationCallback('Unable to connect to location Services', undefined)
        } else if (body.features.length == 0) {
            locationCallback('Unable to fetch Location. Try again with new Search', undefined)
        } else {
            const _geoData = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            locationCallback(undefined, _geoData)
        }
    })
}



module.exports = _getGeoLocation
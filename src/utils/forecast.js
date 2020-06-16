const _postmanRequest = require('postman-request')

const _getWeatherForecast = (latitude, longitude, forecastCallback) => {
    const url = 'http://api.weatherstack.com/current?access_key=91bf761368dd78861879dc08957f45fc&query=' + latitude + ',' + longitude + '&units=f'
    _postmanRequest({ url, json: true }, (error, { body }) => {
        if (error) {
            forecastCallback('Unable to connect to Weather forecast', undefined)
        } else if (body.error) {
            if (body.error.info) {
                forecastCallback(body.error.info, undefined)
            } else {
                forecastCallback('Unable to fetch Weather forecast. Try again.', undefined)
            }
        } else {
            const _data = body.current
            if (_data.weather_descriptions.length == 0) {
                forecastCallback(undefined, 'It\'s currently ' + _data.temperature + ' degrees out. It feels like ' + _data.feelslike + ' degress out. The humidity is ' +_data.humidity + '.')
            } else {
                forecastCallback(undefined, _data.weather_descriptions[0] + '. It\'s currently ' + _data.temperature + ' degrees out. It feels like ' + _data.feelslike + ' degress out. The humidity is ' +_data.humidity + '.')
            }
        }
    })
}

module.exports = _getWeatherForecast
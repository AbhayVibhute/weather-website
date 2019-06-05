const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/a788dc0cdae04ddc825bc5a7111f6ebf/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '?units=si';

    request({
        url,
        json: true
    }, (err, {
        body
    } = {}) => {
        if (err) {
            callback('Unable to connect weather app', undefined);
        } else if (body.error) {
            callback('Unable to find loaction', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.');
        }
    });
}

module.exports = forecast;
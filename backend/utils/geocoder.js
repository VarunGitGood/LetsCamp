const nodegcoder = require('node-geocoder')


const options = {
    provider:process.env.GEOPROVIDER,
    httpAdapter:'https',
    apiKey:process.env.GEOPROVIDER_KEY,
    formatter:null
}

const geocoder = nodegcoder(options)

module.exports = geocoder
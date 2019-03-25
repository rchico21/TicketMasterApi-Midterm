//const consumer_key = 'gVSUpkvgoodkdi1GQyHHJBgG9uBJjZn5'
//const consumer_secret = 'ZL5af9iv87rUeszj'
let request = require('request')
var express = require('express')
var app = express()

const config = require('./config')
const superagent = require('superagent')

app.get('/', function(req, res) {
    var auth_code = req.query.code
    var success_body = ""
    var resp = request ({
        url: 'https//oauth.ticketmaster.com/oauth/token',
        method: 'POST',
        form: {
            grant_type: 'authorization_code',
            client_id: 'gVSUpkvgoodkdi1GQyHHJBgG9uBJjZn5',
            client_secret: 'ZL5af9iv87rUeszj',
            code: auth_code
        }

    }, function(error, response, body) {
        if(error){
            console.log(error)
        }
        else{
            console.log(response.statusCode, body)
            console.log(success_body.access_token)
            console.log(success_body.refresh_token)
            //res.redirect("http://localhost:8081/?access_token=" + sucess_boddy.access_token + "&refresh_token" + success_body.refresh_token)
        }
    })
})

const _fetch = (command) => {
    return superagent.get(`${config.url}/${command}`)
        
        .then(response => response.body)
        .catch(error => error.response.body)
}

exports.new_event = (countryCode, city) => {
    console.log("Will display events based on city")
    return _fetch(`v2/events.json?countryCode=${countryCode}&size=10&city=${city}`)
}




//app.listen(8080, function() {
//    console.log('example app listening on port 8080')
//})
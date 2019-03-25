let request = require('request');
const newEvent = require("../TM-Custom");
const inquirer = require('inquirer')
const Table = require('cli-table')
let tables = new Table();

const new_event = (country = 'US', size = 10) => {
    return inquirer.prompt([{
        type: 'input',
        message: 'Enter a 2 letter country code: ',
        name: 'countryInput',
        validate: (answer) => {
            if(answer.length > 2 || answer.length <= 0){
                return "Must be TWO letters and have NO numbers!"
            }
            else{
                ans = answer
                return true
            }
        }
    }])

    .then(answers => {
        return inquirer.prompt([{
            type: 'input',
            message: 'Input which city: ',
            name: 'cityInput',
            validate: (answer) => {
                if(answer.length < 2){
                    return "Must Enter a city name"
                }
                else{
                    ans = answer
                    return true
                }
            }

        }])

        .then(ans => {
            let data = [['Number', 'Event Name', 'Start Date Time']]
            let eventName = []
            let output
            let count = 1
            let eventList = []
            newEvent.new_event(answers.countryInput, ans.cityInput)
            .then(result => {
                result._embedded.event.forEach(element => {
                    element.name.forEach(element1 => {
                        eventName.push(element1.name)
                    })
                    console.log('n')
                    data.push([count, element.name, element.date])
                    eventList.push({count: count, name: element.name, id: element.id})
                    count++
                    eventName = []
                })

                output = table(data)
                counsole.log(output)
            })

            .catch(err => console.log("Error: ", err))

            .then(an => {
                return inquirer.prompt([{
                    type: 'list',
                    message: 'Choose one event',
                    name: 'eventInput',
                    choices: eventList,
                    validate: (answer) => {
                        if(answer > 1 || answer <= 0){
                            return "Must choose one"
                        }
                        else{
                            ans = answer
                            return true
                        }
                    }
                }])
            })
        })
    })
}

module.exports = {
    new_event
}
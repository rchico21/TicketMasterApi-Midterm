const
    app = require('./app'),
    yargs = require('yargs')

const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'searches for an item specified by the user',
        builder: (yargs) => {
            return yargs.options('newEvent',{
                alias: 'newE',
                describe: 'List of new event in a specific country'})
            .option('country', {
                alias: 'count',
                describe: 'search for event in country'})
            .option('city', {
                alias: 'cit',
                describe: 'search for event in city'
            })
        },
        handler: (argv) => {
            if(argv.newE){
                console.log("New event being searched: ")
                app.new_event(argv.countryCode = 'US', argv.size = 10)
            }
        }
    })

    .command({
        command: 'newEvent',
        desc: 'search for new events',

        builder:(yargs) => {
            return yargs.option('country', {
                alias: 'countries',
                describe: 'two letter char representation'
            })
            .option('size', {
                alias: 'sizes',
                describe: 'limits the result'
            })
        },

        handler: (argv) => {app.new_event(argv.countryCode, argv.size)}
        
    })


    .help('help')
    .argv
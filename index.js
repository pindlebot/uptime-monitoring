const schedule = require('node-schedule')
const twilio = require('twilio')
require('isomorphic-fetch')
if(process.env.NODE_ENV === 'dev') { require('env2')('.env') }
const config = require('./config')

const sites = ['http://www.example.com']
var twilioClient = new twilio(config.accountSid, config.authToken);

const sendMessage = async (site) => {
  return await twilioClient.messages.create({
    body: `${site} is down!`,
    to: config.recipientNumber, 
    from: config.twilioNumber
  }) 
}

const run = async () => {
  for(let i in sites) {
    var resp = await fetch(sites[i]) 
    if(resp.status >= 200 && resp.status < 300) {
      // Site is OK
      console.log("Site is OK")
    } else {
      // Site is down; send an SMS
      var resp = await sendMessage(sites[i])
      console.log(resp)
    }
  }
}

//schedule.scheduleJob('*/1 * * * *', () => { run() })
run()
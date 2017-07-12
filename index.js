const schedule = require('node-schedule')
const twilio = require('twilio')
require('isomorphic-fetch')

const sites = ['http://www.example.com']

const accountSid = ''; 
const authToken = '';   
var twilioClient = new twilio(accountSid, authToken);

const sendMessage = async ({site, to, from}) => {
  var body = `${site} is down!`
  return await twilioClient.messages.create({body, to, from}) 
}

const run = async () => {
  for(let i in sites) {
    var resp = await fetch(sites[i]) 
    if(resp.status >= 200 && resp.status < 300) {
      // Site is OK
    } else {
      // Site is down; send an SMS
      var resp = await sendMessage({site: sites[i], to: 'SENDER_#', from: 'RECIPIENT_#'})
    }
  }
}

schedule.scheduleJob('*/1 * * * *', () => { run() })

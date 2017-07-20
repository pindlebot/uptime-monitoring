const express = require('express')
const schedule = require('node-schedule')
const twilio = require('twilio')
require('isomorphic-fetch')
if(process.env.NODE_ENV === 'dev') { require('env2')('.env') }
const config = require('./config')

const sites = ['http://www.example.com', 'http://not-an-extant-site.com']
var twilioClient = new twilio(config.accountSid, config.authToken);

const sendMessage = async (site) => {
  return await twilioClient.messages.create({
    body: `${site} is down!`,
    to: config.recipientNumber, 
    from: config.twilioNumber
  }) 
}

const run = async () => {
  let results = []
  for(let i in sites) {
    var resp = await fetch(sites[i]).catch(err => { return err })
    if(resp && resp.status >= 200 && resp.status < 300) {
      results.push(`${sites[i]} is OK`)
    } else {
      // Site is down; send an SMS
      results.push(await sendMessage(sites[i]))
    }
  }
  return results
}

schedule.scheduleJob('*/1 * * * *', () => { run() })

const app = express()

app.get('/', async (req, res) => {
  var results = await run()
  res.json({results})
});

app.listen(process.env.PORT || 3000);


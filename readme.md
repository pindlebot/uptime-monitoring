## uptime-monitoring


## Install

```bash
git clone https://github.com/focuswish/uptime-monitoring.git
cd uptime-monitoring
npm install
```

## Running Locally

Edit .env:

```bash
TWILIO_ACCOUNT_SID={YOUR TWILIO ACCOUNT SID}
TWILIO_AUTH_TOKEN={YOUR TWILIO AUTH TOKEN}
TWILIO_NUMBER={YOUR TWILIO REGISTERED NUMBER}
RECIPIENT_NUMBER={YOUR NUMBER}
```

## Deploying With Heroku

### Create A New Heroku App

```bash
cd uptime-monitoring
heroku create
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#v107

```
### Set Environmental Vars

```bash
heroku config:set TWILIO_ACCOUNT_SID={YOUR TWILIO ACCOUNT SID}
heroku config:set TWILIO_AUTH_TOKEN={YOUR TWILIO AUTH TOKEN}
heroku config:set TWILIO_NUMBER={YOUR TWILIO REGISTERED NUMBER}
heroku config:set RECIPIENT_NUMBER={YOUR NUMBER}
```

### Deploy to Heroku

```bash
git remote -v ## check to make sure you've got the right heroku remote 
git push heroku master
```


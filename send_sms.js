// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC4c13a3270ab6835c5b1af73b781d712e';
const authToken = '64bd5a167259a1b42dd402b88e24e89c';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Screw you teemo main',
     from: '+12014743158',
     to: '+16505612658'
   })
  .then(message => console.log(message.sid));
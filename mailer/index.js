// express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.get('/failure', (req, res) => {
  res.redirect('/');
});

app.post('/', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  }

  const JSONdata = JSON.stringify(data);
  const url = 'https://us12.api.mailchimp.com/3.0/lists/704959181';
  const options = {
    method: 'POST',
    auth: 'joker:50e2a31bb7c804952177be812992dad7-us12',
  }
  
  //sending data to api

  const mailchimpRequest = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      response.on('data', (data) => {
        res.sendFile(__dirname + '/success.html')
      })
    } else {
      res.sendFile(__dirname + '/failure.html')
    }
  });

  mailchimpRequest.write(JSONdata);
  mailchimpRequest.end();
});


// 50e2a31bb7c804952177be812992dad7-us12
//704959181b
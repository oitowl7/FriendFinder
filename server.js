const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dataFile1 = require('./data.js');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'landing.html')));

app.get('/survey.html', (req, res) => res.sendFile(path.join(__dirname, 'survey.html')));

app.post("/results.html", function(req, res) {
  const newUser = req.body;
  dataFile1.profiles.push(newUser);
  res.send(dataFile1);
  // res.json(newUser);
  // console.log(req.body)
});

app.get('/results.html', (req, res) => { 
  res.sendFile(path.join(__dirname, 'results.html'));
});


app.get('/data.js', (req, res) => { 
  res.send(dataFile1);
});





app.listen(PORT, () => console.log("App is listening on port: " + PORT));
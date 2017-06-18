var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var Repo = require('../database/index.js');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/import', function (req, res) {
  // TODO
  let username = req.body.username;
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request'
    }
  };
  request(options, (err, response, body) => {
    body = JSON.parse(body).slice(-25);
    // define new repo
    let db = new Repo();
    // set username in new db
    db.username = username;
    // push repos into db
    body.forEach(repo => {
      db.repos.push({description: repo.name, url: repo.html_url});
    });
    db.save();
  })
});

app.get('/repos', function (request, response) {
  // TODO
  let username = request.url.substring(16);
  Repo.find({username: username}, function(err, data) {
    data.forEach(repo => {
      response.send(JSON.stringify(repo));
    });
  });
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


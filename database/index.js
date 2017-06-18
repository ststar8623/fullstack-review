var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  // TODO: your schema here!
  username: String,
  repos: [
    {
      description: String,
      url: String
    }
  ]
});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;
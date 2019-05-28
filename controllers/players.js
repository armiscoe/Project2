var Player = require('../models/userModel');


module.exports = {
    index
}

function index(req, res) {
    Player.find({})
      .sort({ departs: 'asc' })
      .exec(function(err, flights) {
        res.render('players/index', { title: 'All Players', flights });
      });
  }

 
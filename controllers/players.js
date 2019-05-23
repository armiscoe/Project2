var Player = require('../models/player');


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

 
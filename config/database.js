  var mongoose = require('mongoose');

/* mongoose.connect('mongodb://localhost/players',
     {useNewUrlParser: true}
);

var db = mongoose.connection;

db.on('connected', function() {
        console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
})
*/

const uri = process.env.MONGO_CONNECTION_URL;
mongoose.connect(uri, { useNewUrlParser : true, useCreateIndex: true });
mongoose.connection.on('error', (error) => {
  console.log(error);
  process.exit(1);
});
mongoose.connection.on('connected', function () {
  console.log('connected to mongo');
});
// DEPENDENCIES
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');



// CONFIGURATION
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}
  ).catch((e) => {
    console.log("error connecting to mongoose!",e);
  });
  mongoose.connection.on("error", (e) => {
    console.log("mongo connect error!");
  });
  mongoose.connection.on("connected", () => {
    console.log("connected to mongo");
  });
  

// MIDDLEWARE
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));




// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads!')
});

  // Breads
  const breadsController = require('./controllers/breads_controller.js');
  app.use('/breads', breadsController);

  //Bakers
  const bakersController = require('./controllers/bakers_controller.js');
  app.use('/bakers', bakersController);
  
// 404 Page
app.get('*', (req, res) => {
  res.send('404')
});
// LISTEN
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});


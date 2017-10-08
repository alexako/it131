var express = require('express');
var router = express.Router();


router.get('/', function(req, res, net) {
  res.send('Index Express REST API');
});


module.exports = router;

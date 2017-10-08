var express = require('express');
var router = express.Router();


router.get('/', function(req, res, net) {
  res.send('Express REST API');
});

module.exports = router;


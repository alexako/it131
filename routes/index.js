var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  database: process.env.DB_DATABASE
});

var api = {
  getAll:  function(req, res) {
          var query = "SELECT * FROM bars INNER JOIN address ON bars.address_id = address.id";
          connection.query(query, function(err, result) {
            if (err) throw err;
            res.send(result);
          });
        },
  add: function(req, res) {},
  edit: function(req, res) {},
  delete: function(req, res) {}
}

router.get('/', api.getAll);
router.post('/post/:id', api.add);
router.put('/post/:id', api.edit);
router.delete('/post/:id', api.delete);


module.exports = router;


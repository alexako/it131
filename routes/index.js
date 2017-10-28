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
          connection.query('SELECT * FROM test', function(err, result) {
            if (err) throw err;
            res.send(result);
          });
        },
  getBarByID: function(req, res) {
          connection.query('SELECT * FROM test WHERE id = ' + req.params.id, function(err, result) {
            if (err) throw err;
            res.send(result);
          }) 
        },
  add: function(req, res) {
          console.log("add req:", req);
          console.log("add params:", req.params);
          res.send(req);
          // connection.query('INSERT INTO test(name, rating) VALUES ("Test add", 3.0)', function(err, result) { 
          //   if (err) throw err;
          //   res.send(result);
          // })
        },
  edit: function(req, res) {
          console.log("edit req:", req);
        },
  delete: function(req, res) {
          console.log("delete req:", req);
        }
}

router.get('/', api.getAll);
router.get('/:id', api.getBarByID)
router.post('/post/:id', api.add);
router.put('/post/:id', api.edit);
router.delete('/post/:id', api.delete);


module.exports = router;


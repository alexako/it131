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
          console.log("add params:", req.body);
          var params = Object.values(req.body[0]).map(function(val) { return (typeof val === "string") ? "'" + val + "'": val; }).join(', ');
          console.log("body:", params)
          connection.query('INSERT INTO test(url, shady_url) VALUES (' + params + ')', function(err, result) { 
            if (err) throw err;
            res.send(result);
          })
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
router.post('/post/', api.add);
router.put('/post/:id', api.edit);
router.delete('/post/:id', api.delete);


module.exports = router;


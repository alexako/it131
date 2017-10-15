var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'k1udgedit',
  database: 'projectDB'
});

var api = {
  getAll:  function(req, res) {
          connection.query('SELECT * FROM testTable', function(err, result) {
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


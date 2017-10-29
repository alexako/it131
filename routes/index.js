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
          connection.query('SELECT * FROM bars LEFT JOIN address ON bars.address_id = address.id', function(err, result) {
            if (err) throw err;
            res.send(result);
          });
        },
  getBarByID: function(req, res) {
          connection.query('SELECT * FROM bars LEFT JOIN address ON bars.address_id = address.id WHERE bars.id = ' + req.params.id, function(err, result) {
            if (err) throw err;
            res.send(result);
          }) 
        },
  add: function(req, res) {
          connection.beginTransaction(function(err) {
            var address_query = "INSERT INTO address(street, city, province, zip, country) VALUE ('"
              + req.body[0].street + "', '"
              + req.body[0].city + "', '"
              + req.body[0].province + "', '"
              + req.body[0].zip + "', '"
              + req.body[0].country + "');";

            connection.query(address_query, function(err, result) {
                if (err) {
                  connection.rollback(function() {
                    throw err;
                  })
                }

                var address_id = result.insertId;

                var bar_query = "INSERT INTO bars(name, rating, address_id, description) VALUE ('"
                  + req.body[0].name + "', '"
                  + req.body[0].rating + "', "
                  + address_id + ", '"
                  + req.body[0].description
                  + "');";
                console.log(bar_query);

                connection.query(bar_query, function(err, result) {
                    if (err) {
                      connection.rollback(function() {
                        throw err;
                      })
                    }
                    connection.commit(function(err) {
                      if (err) {
                        connection.rollback(function() {
                          throw err;
                        })
                      }
                      res.send(result);
                      connection.end();
                    });
                });
            });
          });
        },
  edit: function(req, res) {
          console.log("edit req:", req);
          connection.query("INSERT INTO bars(name, rating, address_id, description) VALUE ('" + req.body[0].name + "', '" + req.body[0].rating + "', '" + addressResult.insertId + "', '" + req.body[0].description + "')", function(err, result) { 
            if (err) throw err;
            res.send(result);
          })
        },
  delete: function(req, res) {
          console.log("delete req:", req);
        }
}

router.get('/', api.getAll);
router.get('/:id', api.getBarByID)
router.post('/add/', api.add);
router.put('/edit/:id', api.edit);
router.delete('/delete/:id', api.delete);


module.exports = router;


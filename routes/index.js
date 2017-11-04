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
          connection.query('SELECT bars.id, bars.name, rating, price_range, average_cost_for_two, description, address_id, street, city, province, zip, country FROM bars LEFT JOIN address ON bars.address_id = address.id', function(err, result) {
            if (err) throw err;
            res.send(result);
            // connection.end();
          });
        },
  getBarByID: function(req, res) {
          console.log("req:", req);
          connection.query('SELECT bars.id, bars.name, rating, price_range, average_cost_for_two, description, address_id, street, city, province, zip, country FROM bars LEFT JOIN address ON bars.address_id = address.id WHERE bars.id = ' + req.params.id, function(err, result) {
            if (err) throw err;
            res.send(result);
            //connection.end();
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

                var bar_query = "INSERT INTO bars(id, name, rating, address_id, description, price_range, average_cost_for_two) VALUE ('"
                  + Date.parse(new Date()).toString().slice(0, -3) + "', '"
                  + req.body[0].name + "', '"
                  + req.body[0].rating + "', "
                  + address_id + ", '"
                  + req.body[0].description + "', '"
                  + req.body[0].price_range + "', '"
                  + req.body[0].average_cost_for_two
                  + "');";

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
                      //connection.end();
                    });
                });
            });
          });
        },
  edit: function(req, res) {
          connection.query("INSERT INTO bars(name, rating, address_id, description) VALUE ('" + req.body[0].name + "', '" + req.body[0].rating + "', '" + addressResult.insertId + "', '" + req.body[0].description + "')", function(err, result) { 
            if (err) throw err;
            res.send(result);
            //connection.end();
          })
        },
  delete: function(req, res) {
          connection.beginTransaction(function(err) {

            var address_query = "SELECT address_id FROM bars WHERE bars.id = "
              + req.params.id + ";";
            connection.query(address_query, function(err, result) {
                if (err) {
                  connection.rollback(function() {
                    throw err;
                  })
                }

                console.log(result);
                var address_id = result[0].address_id;
                if (!address_id) return;

                var bar_query = "DELETE FROM bars WHERE id = "
                  + req.params.id + ";";
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
                      //connection.end();
                    });
                });
                
                connection.query("DELETE FROM address WHERE id = " + address_id, function(err, result) {
                  if (err) {
                    connection.rollback(function() {
                      throw err;
                    })
                  }
                });
            });
          });
        }
}

router.get('/', api.getAll);
router.get('/bar/:id', api.getBarByID);
router.post('/', api.add);
router.put('/bar/:id', api.edit);
router.delete('/bar/:id', api.delete);


module.exports = router;


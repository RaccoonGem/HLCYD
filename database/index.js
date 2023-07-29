let mysql = require('mysql2');

let connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'leaderboard'
});

connection.connect();

module.exports = connection;
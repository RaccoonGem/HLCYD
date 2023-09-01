const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());
app.use(express.static('client'));

// const db = require('../database');

// app.get('/leaderboard', (req, res) => {
//   let qString = 'SELECT * FROM scores WHERE mode=1';
//   db.query(qString, (err, results) => {
//     if (err) {
//       throw err;
//     } else {
//       res.json(results);
//     }
//   })
// });

// app.post('/leaderboard', (req, res) => {
//   let body = req.body;
//   let qString = 'INSERT INTO scores (mode,score,initials) VALUES('
//   + body.mode + ',' + body.score + ',"' + body.initials + '")';
//   db.query(qString, (err, results) => {
//     if (err) {
//       throw err;
//     } else {
//       res.sendStatus(201);
//     }
//   })
// });

module.exports.app = app;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})
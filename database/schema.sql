CREATE DATABASE leaderboard;

USE leaderboard;

CREATE TABLE scores (
  id INT NOT NULL AUTO_INCREMENT,
  mode INT NOT NULL,
  score INT NOT NULL,
  initials VARCHAR(3) NOT NULL,
  PRIMARY KEY (id)
);
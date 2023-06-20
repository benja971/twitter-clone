const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/db.sqlite');

db.serialize(() => {
	// users table
	db.run(
		'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, CONSTRAINT username_unique UNIQUE (username) ON CONFLICT FAIL)',
	);

	// tweets table
	db.run(
		'CREATE TABLE IF NOT EXISTS tweets (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, user_id INTEGER, createdAt TEXT NOT NULL, FOREIGN KEY(user_id) REFERENCES users(id))',
	);

	// relationships table
	db.run(
		'CREATE TABLE IF NOT EXISTS relationships (id INTEGER PRIMARY KEY AUTOINCREMENT, follower_id INTEGER NOT NULL, followed_id INTEGER NOT NULL, FOREIGN KEY(follower_id) REFERENCES users(id), FOREIGN KEY(followed_id) REFERENCES users(id))'
	)

});

module.exports = db;


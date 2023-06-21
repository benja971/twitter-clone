const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/.db');

db.serialize(() => {
	// users table
	db.run(
		'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, CONSTRAINT username_unique UNIQUE (username) ON CONFLICT FAIL)',
	);

	// tweets table
	db.run(
		'CREATE TABLE IF NOT EXISTS tweets (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, user_id INTEGER, createdAt TEXT, FOREIGN KEY(user_id) REFERENCES users(id))',
	);

	// relationships table
	db.run(
		'CREATE TABLE IF NOT EXISTS relationships (id INTEGER PRIMARY KEY AUTOINCREMENT, follower_id INTEGER NOT NULL, followed_id INTEGER NOT NULL, FOREIGN KEY(follower_id) REFERENCES users(id), FOREIGN KEY(followed_id) REFERENCES users(id))',
	);

	// add a trigger to add the createdAt field to the tweets table
	db.run(
		'CREATE TRIGGER IF NOT EXISTS add_createdAt AFTER INSERT ON tweets BEGIN UPDATE tweets SET createdAt = DATETIME("now") WHERE id = new.id; END;',
	);
});

module.exports = db;

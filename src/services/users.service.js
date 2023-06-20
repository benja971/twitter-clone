const db = require("../db");

// function to create a user
function createUser(req, res) {
	// get the username and password from the request body
	const { username, password } = req.body;

	// check if the username and password are provided
	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Please provide a username and a password" });
	}

	db.serialize(() => {
		const stmt = db.prepare(
			"INSERT INTO users (username, password) VALUES (?, ?)"
		);

		stmt.run(username, password);
		stmt.finalize();

		res.status(201).json({
			message: "User created successfully",
			data: {
				username,
			},
		});
	});
}

// function to get all users
function getAllUsers(req, res) {
	db.serialize(() => {
		db.all("SELECT * FROM users", (err, rows) => {
			if (err) return res.status(500).json({ message: err.message });

			res.status(200).json({
				message: "All users retrieved successfully",
				data: rows,
			});
		});
	});
}

// function to get a single user
function getSingleUser(req, res) {
	const { username } = req.body;
	db.serialize(() => {
		db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
			if (err) return res.status(500).json({ message: err.message });

			res.status(200).json({
				message: "User retrieved successfully",
				data: row,
			});
		});
	});
}

// function to login a user
function loginUser(req, res) {
	const { username, password } = req.body;
	console.log({ username, password });

	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Please provide a username and a password" });
	}

	db.serialize(() => {
		db.get(
			"SELECT * FROM users WHERE username = ? AND password = ?",
			[username, password],
			(err, row) => {
				if (err) return res.status(500).json({ message: err.message });

				if (!row) return res.status(404).json({ message: "User not found" });

				res.status(200).json({
					message: "User logged in successfully",
					data: row,
				});
			}
		);
	});
}

module.exports = {
	createUser,
	getAllUsers,
	loginUser,
	getSingleUser,
};

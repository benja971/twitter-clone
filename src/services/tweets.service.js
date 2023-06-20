const { db } = require("../db");

// function to create a tweet
function createTweet(req, res) {
	const { id: user_id } = req.params;
	const { content } = req.body;

	if (!content || !user_id) {
		return res
			.status(400)
			.json({ message: "Please provide a content and a user_id" });
	}

	db.serialize(() => {
		const stmt = db.prepare(
			"INSERT INTO tweets (content, user_id) VALUES (?, ?)"
		);
		stmt.run(content, user_id); // run the query

		stmt.finalize(); // close the statement

		res.status(201).json({
			message: "Tweet created successfully",
			data: {
				content,
				user_id,
			},
		});
	});
}

// function to get all tweets from a user (by user_id)
function getTweets(req, res) {
	const { id: user_id } = req.params;
	// TODO: pagination

	if (!user_id)
		return res.status(400).json({ message: "Please provide a user_id" });

	db.serialize(() => {
		db.all("SELECT * FROM tweets WHERE user_id = ?", user_id, (err, rows) => {
			if (err)
				return res.status(500).json({ message: "Internal server error" });

			res.status(200).json({
				message: "Tweets retrieved successfully",
				data: rows,
			});
		});
	});
}

// get the tweets of the users that the user follows
function getFeed(req, res) {
	const { id: user_id } = req.params;

	if (!user_id)
		return res.status(400).json({ message: "Please provide a user_id" });

	// select u.username, t.content from tweets t inner join users u on t.user_id = u.id where t.user_id in (select followed_id from relationships where follower_id = user_id);
	// order by t.createdAt desc;
	db.serialize(() => {
		db.all(
			`SELECT u.username, t.content FROM tweets t INNER JOIN users u ON t.user_id = u.id WHERE t.user_id IN (SELECT followed_id FROM relationships WHERE follower_id = ?) ORDER BY t.createdAt DESC`,
			user_id,
			(err, rows) => {
				if (err)
					return res.status(500).json({ message: "Internal server error" });

				res.status(200).json({
					message: "Feed retrieved successfully",
					data: rows,
				});
			}
		);
	});
}

module.exports = {
	createTweet,
	getTweets,
	getFeed,
};

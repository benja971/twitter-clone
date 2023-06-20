const { db } = require('../db');

// function to create a tweet
function createTweet(req, res) {
	const { id: user_id } = req.params;
	const { content } = req.body;

	if (!content || !user_id) {
		return res.status(400).json({ message: 'Please provide a content and a user_id' });
	}

	db.serialize(() => {
		const stmt = db.prepare('INSERT INTO tweets (content, user_id) VALUES (?, ?)');
		stmt.run(content, user_id); // run the query

		stmt.finalize(); // close the statement

		res.status(201).json({
			message: 'Tweet created successfully',
			data: {
				content,
				user_id,
			},
		});
	});
}

module.exports = {
	createTweet,
};

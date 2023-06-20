const { db } = require('../db');

function getRelationshipsOfUser(req, res) {
    const { id: user_id } = req.params;

    if (!user_id) return res.status(400).json({ message: 'Please provide a user_id' });

    db.serialize(() => {
        db.all('SELECT * FROM relationships WHERE follower_id = ?', [user_id], (err, rows) => {
            if (err) return res.status(500).json({ message: 'Internal server error' });

            return res.status(200).json({
                message: 'Relationships retrieved successfully',
                relationships: rows
            });
        });
    });    
}


function createRelationship(req, res) {
    const {id: follower_id, followed_id} = req.params;

    if (!follower_id || !followed_id) return res.status(400).json({ message: 'Please provide a follower_id and followed_id' });

    db.serialize(() => {
        db.run('INSERT INTO relationships (follower_id, followed_id) VALUES (?, ?)', [follower_id, followed_id], (err) => {
            if (err) return res.status(500).json({ message: 'Internal server error' });

            return res.status(201).json({
                message: 'Relationship created successfully',
            });
        });
    })

}


module.exports = {
    getRelationshipsOfUser,
    createRelationship
}
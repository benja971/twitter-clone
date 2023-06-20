const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

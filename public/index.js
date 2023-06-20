			const access_form = document.querySelector('.access_form');
const login = document.querySelector('.login');
const signup = document.querySelector('.signup');

access_form.addEventListener('submit', e => {
	e.preventDefault();

	const username = document.querySelector('input[name="username"]').value;
	const password = document.querySelector('input[name="password"]').value;

	if (!username || !password) return;

	if (e.submitter === login) {
		fetch('/api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
			})
			.catch(err => console.log(err));
	}

	if (e.submitter === signup) {
		fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
			})
			.catch(err => console.log(err));
	}
});

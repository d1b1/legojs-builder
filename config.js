define([], function () {
	return {
		local: {
			url: 'http://localhost:3000'
		},
		prod: {
			url: 'http://api.legojs.io'
		},
		authConfig: {
		    key: 'abc123',
		    secret: 'ssh-secret'
		}
	}
});
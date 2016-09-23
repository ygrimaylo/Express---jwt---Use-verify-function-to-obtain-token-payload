var express = require('express');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')

var port = 3000;
var app = express();

var user = {
  username: 'foo',
  password: 'bar'
};

var tokenSettings = {
  alg: 'HS256'
};
app.disable('x-powered-by');

app.get('/login', function(req, res) {
  if (req.query.username == user.username &&
      req.query.password == user.password) {
    var token = jwt.sign(user, secret, {
      expiresIn: '5m',
      alg: 'HS256'
    });
    res.cookie('token', token, {});
    res.send('you should have a cookie');
  } else {
    res.send('bad login');
  }
});

app.get('/test', function (req, res) {
  if (req.cookies.token) {
    var token1 = jwt.decode(req.cookies.token);
    var token2 = jwt.verify(req.cookies.token, 'test4',
	       {
		 algorithms: ['HS256']
	       }, function (err, token) {
		 res.json(token);
	       });
  } else {
    res.send('no token');
  }
});

app.listen(port, () => {
  console.log("i'm listening...");
});


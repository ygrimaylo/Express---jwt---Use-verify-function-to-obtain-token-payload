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

function authToken(req, res) {
  var token = jwt.verify(req.cookies.token, 'foo');
  req.token = token;
}

function useDecode(req,res) {
  var token = jwt.decode(req.cookies.token, 'foo');
  // Do stuff with tokens data here
}

app.use(authToken);
app.use(useDecode);

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
    var foo = req.token
  } else {
    res.send('no token');
  }
});

app.listen(port, () => {
  console.log("i'm listening...");
});


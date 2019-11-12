var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '登录' });
});



router.post('/list', function(req, res, next) {
  var username = req.body.username;
  var pwd = req.body.pwd;
  var path = './data.json';
  var content = fs.readFileSync(path);
  var data = JSON.parse(content);
  if(username == data.users[0].username && pwd == data.users[0].password) {
    res.render('list', {chapterList:data.chapterList});
  }
  else{
    res.writeHead(200, {'Content-Type': 'text/plain;charset="utf8"'});
    res.end("用户名、密码错误");
  }
});



module.exports = router;

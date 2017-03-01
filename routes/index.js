var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hw1.yml', function(req, res, next) {
 var file = 'files/hw1.yml';
  res.download(file); 
});




module.exports = router;

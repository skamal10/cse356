var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/eliza', function(req, res, next) {
  res.render('eliza', { title: 'Express' });
});

router.get('/hw1.yml', function(req, res, next) {
 var file = 'files/hw1.yml';
  res.download(file); 
});


router.post('/eliza/DOCTOR', function(req, res, next) {
	console.log("OK");
  res.send("bruh");
});



module.exports = router;

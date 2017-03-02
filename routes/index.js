var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('eliza');
});

router.get('/hw1.yml', function(req, res, next) {
 var file = 'files/hw1.yml';
  res.download(file); 
});

// router.get('/eliza', function(req, res, next) {
//   res.render('eliza');
// });




module.exports = router;

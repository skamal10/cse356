var express = require('express');
var router = express.Router();


var randomResponse = ["Sorry, I don't understand", "Why do you say that?", "Tell me more about that",
					"How are you feeling?", "Why do you feel this exact way?", "This isn't about me, this is about you."
					,"What do you mean by that?","Are you sure about that?","Is there anything else you need to say?"
					,"Maybe you should go see a doctor about that."];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hw1.yml', function(req, res, next) {
 var file = 'files/hw1.yml';
  res.download(file); 
});

router.get('/eliza', function(req, res, next) {
  res.render('eliza', { title: 'Express' });
});

router.post('/eliza/DOCTOR', function(req, res, next) {

	var index = Math.floor(Math.random() * randomResponse.length);
    res.send(JSON.stringify({ eliza: randomResponse[index] })  );
});







module.exports = router;

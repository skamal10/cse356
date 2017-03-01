var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST


    router.use(bodyParser.urlencoded({ extended: true }))
	router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
	}))


var randomResponse = ["Sorry, I don't understand", "Why do you say that?", "Tell me more about that",
					"How are you feeling?", "Why do you feel this exact way?", "This isn't about me, this is about you."
					,"What do you mean by that?","Are you sure about that?","Is there anything else you need to say?"
					,"Maybe you should go see a doctor about that."];

router.post('/eliza/DOCTOR', function(req, res, next) {

	var index = Math.floor(Math.random() * randomResponse.length);
    res.send(JSON.stringify({ eliza: randomResponse[index] })  );
});



router.post('/eliza/new', function(req, res) {
   console.log(req);
});

module.exports = router;
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST


var responses= [];

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


responses.push(req);

	var index = Math.floor(Math.random() * randomResponse.length);

responses.push()
    res.send(JSON.stringify({ eliza: randomResponse[index] })  );

});

router.post('/eliza/new-convo', function(req, res, next) {

	var user_id = 1;
            mongoose.model('Convo').create({
            user_id : user_id,
            convo : req.body
        }, function (err, blob) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  res.send("CREATED!");
              }
        })
});

router.post('/eliza/getconv',function(req,res,next){

  var id= req.body['id'];
  mongoose.model('Convo').findOne({ '_id': id },function (err, convo) {
      if (err) {
        res.send({ status: 'ERROR' });
      } else {
          var response= {};
          response.status = "OK";
          response.conversation = convo;
          res.send(response);
      }
    });


});


router.post('/eliza/listconv',function(req,res,next){

  mongoose.model('Convo').find({ 'user_id': 1 },function (err, convo_list) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
        res.send("NOT FOUND");
      } else {
          res.send(convo_list);
      }
    });


});

module.exports = router;

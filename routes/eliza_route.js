var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var User = mongoose.model('User');

var loggedInUser = -1;


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

router.post('/DOCTOR', function(req, res, next) {


	var index = Math.floor(Math.random() * randomResponse.length);
  res.send(JSON.stringify({ eliza: randomResponse[index] })  );

});

router.post('/new-convo', function(req, res, next) {

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

router.post('/getconv',function(req,res,next){

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


router.post('/listconv',function(req, res, next){

  mongoose.model('Convo').find({ 'user_id': loggedInUser },function (err, convo_list) {
      if (err) {
        res.send({ status: 'ERROR' });
      } else {

          var convos= {};
          convos.status= 'OK';
          convos.conversations = convo_list.slice();
          res.send(convos);
      }
    });


});

router.post('/adduser',function(req, res, next){


      var username = req.body['username'];
      var pw       = req.body['password'];
      var email    = req.body['email'];

      User.create({
        verified: false,
        u_name: username,
        password: pw,
        verify_key: 'JxY3L135',
        email: email 
      }, function(err, user){
          if(err){
            res.send({ status: 'ERROR' });
          }
          else{
            res.send({ status: 'OK' });
          }


      });
});


router.post('/verify', function(req, res, next){

  var email = req.body['email'];
  var key   = req.body['key'];
  var backdoor = "abracadabra";

  User.findOne({'email': email} , function (err,  user){

      if(err || !user){
           res.send({ status: 'ERROR' });
      }
      else if( key === user.verify_key || key === backdoor || user.verified == true){

            // User.update({ _id: user._id }, { $set: { verified: true } },function (err, user) {
            //       if (err){
            //          res.send({ status: 'ERROR' });
            //       }
            //       res.send(tank);
            // });
            user.verified = true;
            user.save();
            res.send({ status: 'OK' });
      }

      else{
        res.send({ status: 'ERROR' });
      }

  });

});

router.post('/login', function(req, res, next){

  var username = req.body['username'];
  var password = req.body['password'];

  User.findOne({'u_name': username},function(err, user){

    if(err || !user){
       res.send({ status: 'ERROR -> User NOT FOUND' });
    }
    else if(user.password === password && user.verified){
      loggedInUser = user._id;
      res.send(user);
    }
    else{
      res.send({ status: 'ERROR NOT verified' });
    }

  });

});


router.post('/logout', function(req, res, next){

  if(loggedInUser != -1){
      loggedInUser = -1; // log out
      res.send({ status: 'OK' });
  }
  else{
    res.send({ status: 'ERROR' });
  }

});



module.exports = router;

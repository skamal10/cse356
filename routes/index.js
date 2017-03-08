var express = require('express');
var router = express.Router();
var amqp = require('amqplib/callback_api');

router.get('/hw1.yml', function(req, res, next) {
    var file = 'files/hw1.yml';
    res.download(file); 
});

router.get('/eliza', function(req, res, next) {

	// Trying to add the cookie here as well to see if any of the two work
	res.cookie('cookieName','edqfdr3f', { domain: '130.245.168.122', path: '/eliza',httpOnly: false, secure: false });
	res.render('eliza');
});

router.post('/listen',function(req,res,next) {


amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'hw3';
    var reg = false;
    ch.assertExchange(ex, 'direct', {durable: false});
    ch.assertQueue('', {exclusive: true}, function(err, q) {

      req.body['keys'].forEach(function(severity) {
        ch.bindQueue(q.queue, ex, severity);
      });

      ch.consume(q.queue, function(msg) {
        if(reg==false){
            res.send(({"msg": msg}));
            reg=true;
        }
      },{noAck: true});
    });
  });
});
res.send(msgret);
});

router.post('/speak',function(req, res, next){

	amqp.connect('amqp://localhost', function(err, conn) {
  		conn.createChannel(function(err, ch) {
    		var ex = 'hw3';

    		ch.assertExchange(ex, 'direct', {durable: false});
    		ch.publish(ex, req.body['key'], new Buffer(req.body['msg']));
    		res.send({"status" : "OK"});
  	});

  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
});




module.exports = router;

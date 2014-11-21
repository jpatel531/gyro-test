var express = require('express');
var router = express.Router();

var pusher = require('../config/pusherConfig');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('control');
});

router.post('/', function(req, res){
	var o = req.body;
	pusher.trigger('tilt-channel', 'new-tilt', o);
	res.json({success: 200})
});


module.exports = router;
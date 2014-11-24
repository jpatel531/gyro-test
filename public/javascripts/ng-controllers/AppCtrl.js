var app = angular.module('GyroTest', ['pusher-angular']).controller('AppCtrl', ['$scope', '$pusher', function($scope, $pusher){

	// var canvas=document.getElementById("canvas"),
	//     ctx = canvas.getContext("2d");

	// canvas.width = canvas.height = 500;

	// var targetX = 0,
	//     targetY = 0,
	//     x = 10,
	//     y = 10,
	//     velX = 0,
	//     velY = 0,
	//     speed = 5;

	// function update(){
	//     var tx = targetX - x,
	//         ty = targetY - y,
	//         dist = Math.sqrt(tx*tx+ty*ty),
	//         rad = Math.atan2(ty,tx),
	//         angle = rad/Math.PI * 180;

	//         velX = (tx/dist)*speed,
	//         velY = (ty/dist)*speed;
	    
	//         x += velX
	//         y += velY
	            
	//         ctx.clearRect(0,0,500,500);
	//         ctx.beginPath();
	//         ctx.arc(x,y,5,0,Math.PI*2);
	//         ctx.fill();
	    
	//     setTimeout(update,10);
	// }

	// update();

	// canvas.addEventListener("mousemove", function(e){
	//     targetX = e.pageX;
	//     targetY = e.pageY;
	// });

	var client = new Pusher('77f6df16945f47c63a1f');
	var pusher = $pusher(client);

	var tiltChannel = pusher.subscribe('tilt-channel');


	elem = document.getElementById('test');

	tiltChannel.bind('new-tilt', function(data){
		// targetY = (data.beta * 5 );
		// targetX = (data.gamma * 5);

		// console.log(elem.style.marginTop);

	    var width = window.outerWidth,
        x_rot = data.gamma / 360,
        left = ( width ) * x_rot;
    	elem.style.left = left + 'px';

    	var height = window.outerHeight
    	y_rot = data.beta / 360
    	var topStyle = (height ) * y_rot;
    	console.log(topStyle);
    	elem.style.top = topStyle  + 'px';

		$scope.tilt = data;
	});

	
}]);

app.controller('TiltCtrl', ['$scope', '$pusher', '$http', function($scope, $pusher, $http){
	
	// gyro.frequency = 1000;

  	gyro.startTracking(function(o) {
		$scope.$apply(function(){$scope.gyro = {alpha: o.alpha, beta: o.beta, gamma: o.gamma}})
       	$http.post('/control', o).success(function(data){console.log('Posted')});
    });



}]);


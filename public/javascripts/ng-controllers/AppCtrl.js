var app = angular.module('GyroTest', ['pusher-angular']).controller('AppCtrl', ['$scope', '$pusher', function($scope, $pusher){

	var canvas;
	var ctx;
	var dx = 5;
	var dy = 5;
	var x = 200;
	var y = 5;
	var WIDTH = 482;
	var HEIGHT = 482;
	var img = new Image();
	var collision = 0;

	function rect(x,y,w,h) {
		ctx.beginPath();
		ctx.rect(x,y,w,h);
		ctx.closePath();
		ctx.fill();
	}

	function clear() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		ctx.drawImage(img, 0, 0);
	}

	function init() {
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		img.src = "images/maze.gif";
		return setInterval(draw, 10);
	}

	function doKeyDown(evt){
		switch (evt.keyCode) {
			case 38:  /* Up arrow was pressed */
			if (y - dy > 0){
				y -= dy;
				clear();
				checkcollision();
				if (collision == 1){
					y += dy;
					collision = 0;
				}
			}

			break;
			case 40:  /* Down arrow was pressed */
			if (y + dy < HEIGHT ){
				y += dy;
				clear();
				checkcollision();
				if (collision == 1){
					y -= dy;
					collision = 0;
				}
			}

			break;
			case 37:  /* Left arrow was pressed */
			if (x - dx > 0){
				x -= dx;
				clear();
				checkcollision();
				if (collision == 1){
					x += dx;
					collision = 0;
				}
			}
			break;
			case 39:  /* Right arrow was pressed */
			if ((x + dx < WIDTH)){
				x += dx;
				clear();
				checkcollision();
				if (collision == 1){
					x -= dx;
					collision = 0;
				}
			}
			break;
		}
	}


	function moveSquare(tilt){
		if (tilt.beta < -30){
			console.log('up')
			if (y - dy > 0){
				y -= dy;
				clear();
				checkcollision();
				if (collision == 1){
					y += dy;
					collision = 0;
				}
			}
		} else if (tilt.beta > 30) {
			console.log('down');
			if (y + dy < HEIGHT ){
				y += dy;
				clear();
				checkcollision();
				if (collision == 1){
					y -= dy;
					collision = 0;
				}
			}
		} else if (tilt.gamma < 30){
			console.log('left');
			if (x - dx > 0){
				x -= dx;
				clear();
				checkcollision();
				if (collision == 1){
					x += dx;
					collision = 0;
				}
			}
		} else if (tilt.gamma > 30){
			console.log('right');
			if ((x + dx < WIDTH)){
				x += dx;
				clear();
				checkcollision();
				if (collision == 1){
					x -= dx;
					collision = 0;
				}
			}
		}



			// case tilt.beta > 10:  /* Down arrow was pressed */
			// console.log('down');
			

			// break;
			// case tilt.gamma < -10:  /* Left arrow was pressed */
			// console.log('left')
			// if (x - dx > 0){
			// 	x -= dx;
			// 	clear();
			// 	checkcollision();
			// 	if (collision == 1){
			// 		x += dx;
			// 		collision = 0;
			// 	}
			// }
			// break;
			// case tilt.gamma > 10:  /* Right arrow was pressed */
			// console.log('right');
			// if ((x + dx < WIDTH)){
			// 	x += dx;
			// 	clear();
			// 	checkcollision();
			// 	if (collision == 1){
			// 		x -= dx;
			// 		collision = 0;
			// 	}
			// }
			// break;
	}

	function checkcollision() {
		var imgd = ctx.getImageData(x, y, 15, 15);
		var pix = imgd.data;
		for (var i = 0; n = pix.length, i < n; i += 4) {
			if (pix[i] == 0) {
				collision = 1;
			}
		}
	}

	function draw() {
		clear();
		ctx.fillStyle = "purple";
		rect(x, y, 15,15);
	}





	init();
	window.addEventListener('keydown',doKeyDown,true);


	var client = new Pusher('77f6df16945f47c63a1f');
	var pusher = $pusher(client);

	var tiltChannel = pusher.subscribe('tilt-channel');


	elem = document.getElementById('test');

	tiltChannel.bind('new-tilt', function(tilt){
			// targetY = (data.beta * 5 );
			// targetX = (data.gamma * 5);
			moveSquare(tilt);
			// console.log(elem.style.marginTop);

			// var width = window.outerWidth,
			// x_rot = data.gamma / 360,
			// left = ( width ) * x_rot;
			// elem.style.left = left + 'px';

			// var height = window.outerHeight
			// y_rot = data.beta / 360
			// var topStyle = (height ) * y_rot;
			// console.log(topStyle);
			// elem.style.top = topStyle  + 'px';

			// $scope.tilt = data;
		});


}]);

app.controller('TiltCtrl', ['$scope', '$pusher', '$http', function($scope, $pusher, $http){
	
	// gyro.frequency = 1000;

	gyro.startTracking(function(o) {
		$scope.$apply(function(){$scope.gyro = {alpha: o.alpha, beta: o.beta, gamma: o.gamma}})
		$http.post('/control', o).success(function(data){console.log('Posted')});
	});



}]);


// animation.js

var ANIMATION = (function () {
	
	var me = {};
	var _canvas = null;

	me.setCanvas = function (canvas){
	_canvas = canvas;
    }

	me.circle = function(x,y,r,colour) {
	  _canvas.beginPath();
	  _canvas.arc(x, y, r, 0, Math.PI*2, true);
	  _canvas.closePath();
	  _canvas.fillStyle   = colour;
	  _canvas.fill();
    }

    me.rectangle = function(x,y,w,h,colour) {
      _canvas.beginPath();
	  _canvas.rect(x,y,w,h);
	  _canvas.closePath();
	  _canvas.fillStyle   = colour;
	  _canvas.fill();
    }

    me.clear =function (x,y,w,h) {
 	 _canvas.clearRect(x, y, w, h);
}
	return me;
}());
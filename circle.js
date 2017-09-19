	/*
	Creates a circle
	Contains the functions:
	-getPointsInCircle (A function that finds the points on the edge of the circle)
	
	inputs: x-coordinate, y-coordinate, a radius
	outputs: a point array with the points in the circle.
	
	*/
	
	var x;
	var y;
	var r;
	var speedX;
	var speedY;
	
	//Constructor
	function Circle(x, y, r) {
		
		this.x = x,
		this.y = y;
		this.r = Math.round(r);
		
		
		this.getPointsInCircle = getPointsInCircle;
		/*
		this.getTopPoint = getTopPoint;
		this.getBottomPoint = getBottomPoint;
		this.getRightPoint = getRightPoint;
		this.getLeftPoint = getLeftPoint;
		*/
	}
	
	//Returns an array with the points on the circle
	function getPointsInCircle() {
		var pointArray = new Array();
		var px = new Array();
		var py = new Array();
		
		for(var vinkelRäknare = 0; vinkelRäknare<360; vinkelRäknare++) {
			
			var rad = vinkelRäknare*(Math.PI/180);
			px[vinkelRäknare] = Math.round(Math.cos(rad)*this.r+this.x);
			py[vinkelRäknare] = Math.round(Math.sin(rad)*this.r+this.y);
			
		}
		
		for(var createPoints = 0; createPoints<px.length; createPoints++) {
			
			pointArray[createPoints] = new Point(px[createPoints], py[createPoints]);
			
		}
		
		var pArray = new Array();
		var pArrayCounter = 0;
		for(var lessenPArray = 0; lessenPArray<pointArray.length-1; lessenPArray++) {
			
			if(!pointArray[lessenPArray].isPointsEqual(pointArray[lessenPArray+1])) {
				
				pArray[pArrayCounter] = pointArray[lessenPArray];
				pArrayCounter++;
				
			}
			
			
		}
		
		return pArray;
		
	}
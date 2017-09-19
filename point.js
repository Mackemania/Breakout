	/*
	Creates a point
	Contains the functions:
	-getX (Returns the x value of the point)
	-getY (Returns the y value of the point)
	-isPointsEqual (Return a boolean based on if the two points have the same coordinates)
	
	Inputs: x-coordinate, y-coordinate, points
	Outputs: x-coordiate, y-coordiate, boolean
	
	*/
	//Constructior
	function Point(x, y) {
	
		this.x = x;
		this.y = y;
		this.getX = getX;
		this.getY = getY;
		this.isPointsEqual = isPointsEqual;
	
	}
	
	//returns the x-value of the point
	function getX() {
		
		return this.x;
		
	}
	
	//returns the y-value of the point
	function getY() {
		
		return this.y;
		
	}
	
	/*Compares two points and return true if their x-value and y-value are the same
		input: point p
		output: boolean
	
	*/
	function isPointsEqual(p) {
		
		var px = p.getX();
		var py = p.getY();
		
		if(this.x == px && this.y == py) {
			
			return true;
			
		} else {
			
			return false;
			
		}
		
	}
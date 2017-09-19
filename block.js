	/*
	Creates a blocks
	Contains the functions:
	-drawBlock (Draws the block in the window)
	-hit (kills the block when called on)
	-isDead (returns a boolean based on if the block is dead)
	-getX (returns the x-value of the block)
	-getWidth (returns the width of the block)
	-getY (returns the y-value of the block)
	-getHeight (returns the height of the block)
	-isPointInBlock	(returns a boolean if the point is inside the block)
	-pointInBlock (returns the index of the point that's in the block)
	-isPointsOnEdge (returns a number if any of the points in an array is on the edge the number 
		is 0-4 where 0 is top edge, 1 is bottom edge, 2 is left edge 3 is right edge and 4 is a corner)
	-getCornerPoints (returns the 4 corner points)
	
	*/
	var x;
	var y;
	var cWidth;
	var cHeight;
	var width;
	var height;
	var dead;
	var topPoints;
	var bottomPoints;
	var rightPoints;
	var leftPoints;
	var cornerPoints;
	var debug = false;
	
	//Constructor
	function Block(x, y, cWidth, cHeight, antalKolumner) {
		this.x = Math.floor(x);
		this.y = Math.floor(y+ (cHeight/10));
		this.cWidth = cWidth;
		this.cHeight = cHeight;
		this.height = Math.ceil(this.cHeight/30);
		this.width = Math.ceil(this.cWidth/(columns));
		this.dead = false;

		this.drawBlock = drawBlock;
		this.hit = hit;
		this.isDead = isDead;
		this.getX = getX;
		this.getWidth = getWidth;
		this.getY = getY;
		this.getHeight = getHeight;
		this.isPointInBlock = isPointInBlock;
		this.pointInBlock = pointInBlock;
		this.isPointsOnEdge = isPointsOnEdge;
		this.getCornerPoints = getCornerPoints;
		
	}

	//Draws the block
	function drawBlock(debug, color) {
		this.debug = debug;
		if (this.debug) {
			context.fillStyle = "#00E5EE";
			/*
			for(var i = 0; i<this.cornerPoints.length; i++) {
				var x = this.cornerPoints[i].getX();
				var y = this.cornerPoints[i].getY();
				context.fillStyle = "#FF0000";
				context.beginPath();
				context.rect(x, y, 1, 1);
				context.fill();
			}
			*/
			
			for(var i = 0; i<this.topPoints.length; i++) {
				var x = this.topPoints[i].getX();
				var y = this.topPoints[i].getY();
				context.fillStyle = "#00FF00";
				context.beginPath();
				context.rect(x, y, 1, 1);
				context.fill();
				
				var x = this.bottomPoints[i].getX();
				var y = this.bottomPoints[i].getY();
				context.fillStyle = "#00FF00";
				context.beginPath();
				context.rect(x, y, 1, 1);
				context.fill();
			}
			
			for(var i = 0; i<this.rightPoints.length; i++) {
				var x = this.rightPoints[i].getX();
				var y = this.rightPoints[i].getY();
				context.fillStyle = "#00FF00";
				context.beginPath();
				context.rect(x, y, 1, 1);
				context.fill();
				
				var x = this.leftPoints[i].getX();
				var y = this.leftPoints[i].getY(); 
				context.fillStyle = "#00FF00";
				context.beginPath();
				context.rect(x, y, 1, 1);
				context.fill();
			}
		}
		else{
			
			context.fillStyle = color;
			context.strokeStyle="#ffffff";
			context.beginPath();
			context.rect(this.x, this.y, this.width, this.height);
			context.fill();
			context.stroke();
			
		}
		
			
		//Draw hitboxes on blocks
		/*
		
		*/
	}
	
	//Kills the block
	function hit() {
		this.dead = true;

	}
	/*Checks if the block is dead
		output: boolean
	*/
	function isDead() {

		return this.dead;

	}

	/*Retruns the x-value of the block
		output: width of block
	*/
	function getX() {

		return this.x;

	}
	
	/*returns the width of the block
		output: width of block
	*/
	function getWidth() {

		return this.width;

	}
	
	/*returns the y-value of the block
		output: y-value
	*/
	function getY() {
		return this.y;
	}
	
	/* returns the height of the block
		output: height of block
	
	*/
	function getHeight(){

		return this.height;
	}
	
	/*returns true if one of the points is in the block
		input: point array
		output: boolean
	
	*/
	function isPointInBlock(points) {
		
		for(var dotCounter = 0; dotCounter<points.length;dotCounter++) {
			px = points[dotCounter].getX();
			py = points[dotCounter].getY();
			
			if(px>this.x && px<(this.x+this.width) && py>this.y && py<this.y+this.height) {
				
				return true;
				
			} else {
				
				return false;
				
			}
		}
		
		
	}
	/*Returs a number between -1-4 based on if and where the points intersects
		inputs: point array
		outputs: -1 == not intersected, 0 intersection with top, 1 intersection with bottom, 
				2 intersection with left, 3 intersection with right, 4 intersection with corner
		
		
	*/
	function isPointsOnEdge(points){
		
		topPoints = new Array();
		bottomPoints = new Array();
		rightPoints = new Array();
		leftPoints = new Array();
		cornerPoints = new Array();
		
		cornerPoints[0] = new Point(Math.round(this.x), Math.round(this.y));
		cornerPoints[1] = new Point(Math.round(this.x+this.width), Math.round(this.y));
		cornerPoints[2] = new Point(Math.round(this.x), Math.round(this.y+this.height));
		cornerPoints[3] = new Point(Math.round(this.x+this.width), Math.round(this.y+this.height));
		
		
		for(var i = 0; i<Math.ceil(this.width-0); i++) {
			
			topPoints[i] = new Point(Math.round(this.x+i), Math.round(this.y));
			bottomPoints[i] = new Point(Math.round(this.x+i), Math.round(this.y+this.height));
			
		}
		
		for(var i = 1; i<Math.ceil(this.height-1); i++) {
			
			leftPoints[i-1] = new Point(Math.round(this.x), Math.round(this.y+i));
			rightPoints[i-1] = new Point(Math.round(this.x+this.width), Math.round(this.y+i));
			
		}
		
		var currentArray = [rightPoints, leftPoints, topPoints, bottomPoints];
			
		this.topPoints = topPoints;
		this.bottomPoints = bottomPoints;
		this.leftPoints = leftPoints;
		this.rightPoints = rightPoints;
		this.cornerPoints = cornerPoints;
		
		
		for(var k = 0; k<4; k++) {
			
			for(var i = 0; i<points.length; i++) {
				
				for(var j = 0; j<currentArray[k].length; j++) {
					
					if(points[i].isPointsEqual(currentArray[k][j])) {
						
						return k;
						
					}
				
				}
			}
		}
		
		for(var cornerIndex = 0; cornerIndex<cornerPoints.length; cornerIndex++) {
			for(var pointsIndex = 0; pointsIndex<points.length; pointsIndex++) {
				
				if(cornerPoints[cornerIndex].isPointsEqual(points[pointsIndex])) {
					
					return 4;
				}
				
			}
			
			
		}
		return -1;
		
	}
	
	/*Returns the index number of which point is in the block
		input: point array
		output: index number of the point in the block
	
	*/
	function pointInBlock(points) {
		
		for(var dotCounter = 0; dotCounter<=points.length;dotCounter++) {
			px = points[dotCounter].getX();
			py = points[dotCounter].getY();
			//console.log(px, py);
			if(px>this.x && px<(this.x+this.width) && py>this.y && py<this.y+this.height) {
				
				
				return dotCounter;
			}
		}
		
	}
	
	/* returns an array with the points of the corner
		output: point array
	
	*/
	function getCornerPoints() {
		
		return this.cornerPoints;
		
	}

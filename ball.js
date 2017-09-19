	/*
	Creates a ball
	Contains the functions:
	-moveBall (moves the ball)
	-drawBall (draws the ball)
	-getX (returns the center x-value of the ball)
	-getY (returns the center y-value of the ball)
	-getRadius (returns the radius of the ball)
	-setGround (sets the colliding ground the ball will bounce on)
	-speedUp (speeds upp the game)
	-setSKey (sets a boolean to true if the s-key is pressed and false if its not)
	-followPlank (Makes the ball follow the plank)
	-middleOfBall (returns the middle of the ball)
	-getSpeedX (returns the horizontal speed)
	-getSpeedY (returns the vertical speed)
	-setSpeedX (canges the horizontal speed to the choosen value)
	-setSpeedY (canges the vertical speed to the choosen value)
	-turnX (changes the horizontal speed to the negative or positive value)
	-turnY (changes the vertical speed to the negative or positive value)
	*/
	var x;
	var y;
	var radius;
	var speedYBase;
	var speedY;
	var speedX;
	var height;
	var width;
	var ground;
	var plankWidth;
	var plankPosX1;
	var plankPosX2;
	var middleOfBall;
	var procentageOnPlank;
	var sKey;
	var baseSpeed;
	var debug = false;
	
	//Constructor
	function Ball(x, y, width, height) {

		this.x = x;
		this.y = y;
		this.radius = width*0.006;
		this.width = width;
		this.height = height;
		this.ground = height;
		this.speedY = -3;//0.0015*height;
		this.speedX = 0.01;//0.0015*width;
		this.baseSpeed = true;

		this.moveBall = moveBall;
		this.drawBall = drawBall;
		this.getX = getX;
		this.getY = getY;
		this.getRadius = getRadius;
		this.setGround = setGround;
		this.speedUp = speedUp;
		this.setSKey = setSKey;
		this.followPlank = followPlank;
		this.middleOfBall = middleOfBall;
		this.debug = debug;
		this.getSpeedY = getSpeedY;
		this.getSpeedX = getSpeedX;
		this.setSpeedY = setSpeedY;
		this.setSpeedX = setSpeedX;
		this.turnY = turnY;
		this.turnX = turnX;
	}
	
	//moves the ball according to the x- and vertical speed
	function moveBall(debug) {
		//Check were the ball gets hit
		this.y += this.speedY;
		this.x += this.speedX;
		//get middle of ball || this.x + (this.radius/2) //Where it hits on plank planksX
		//this.middleOfBall = this.x + (this.radius/2);
		/*
		this.plankPosX1 = 
		this.plankPosX2 = this.plankPosX + this.plankWidth;
		var middleOfPlank = this.plankPosX1+(this.plankWidth/2);
		var ballPositionOnPlank = this.x - this.plankPosX1;
		console.log(ballPositionOnPlank, middleOfPlank);
		if(!(ballPositionOnPlank<0 ||ballPositionOnPlank > this.plankWidth)) {
			turnY();
			percentPosition = (ballPositionOnPlank-middleOfPlank)/this.plankWidth;
			console.log("pp"+percentPosition);
			
		

		/*
		if ((((this.y+this.radius)>= this.ground) && ((this.y+this.radius) <= (this.ground+this.speedY)) && (this.speedY>0)) || (this.y+this.radius)>= this.height) {
			//alert("Here");
			//Left
			if (this.x >= this.plankPosX && this.x <= (this.plankPosX+(this.plankWidth/3))) {//Yellow Zone
				if (debug) {
					alert("Works1");
				}
				this.speedY*=-1;
				if (this.speedX >= 0) {
					this.speedX = -1;
				}
				else if (this.speedX > 0) { //When Ball Enters From Left Side
					if (debug) {
						alert("Do nothing");
					}
				}
			}
			if (this.x >= (this.plankPosX+(this.plankWidth/3)) && this.x <= this.plankPosX+(this.plankWidth/3)*2) { //Mid CollisionBox
				this.speedX=0;
				this.speedY*=-1;
			}
			//Right
			if ((this.x >= (this.plankPosX+(this.plankWidth/3)*2)) && this.x <= this.plankPosX+(this.plankWidth/3)*3) {//RightCollisionBox
				if (debug) {
				
				alert("Works3");
				}
				this.speedY*=-1;
				if (this.speedX >= 0) {
					this.speedX = 1;
				}
				else if (this.speedX < 0) { //When Ball Enters Box From Right Side
					if (debug) {
					alert("Do nothing");
					}
				}
			}
			if (this.debug && this.y > this.height) {
			
				this.SpeedY*=-1;
			
			}
		}
		else */if (((this.y-this.radius) <= 0) && (this.speedY<0)) {

			this.speedY*=-1;
		}

		if ((((this.x+this.radius)>= this.width) && ((this.x+this.radius)< (this.width+this.speedX)) && (this.speedX>0)) || (this.x+this.radius)>= this.width) {

			this.speedX*=-1;

		} else if (((this.x-this.radius) <= 0) && (this.speedX<0)) {

			this.speedX*=-1;

		}
	}
	
	/*makes the ball follow the plank by setting is coordinates to x and y
		inputs: x, y
	*/
	function followPlank(x,y){
		this.y = y;
		this.x = x;
	}
	
	//draws the ball
	function drawBall() {
		if (debug) {
			context.strokeStyle = "red";
		}
		else{
			context.strokeStyle = "#000000";
			context.fillStyle = "#000000";
		}
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, (2*Math.PI));
		context.stroke();
		context.fill();

	}
	
	/* returns the x-value of the ball
		output: x-value
	*/
	function getX() {

		return this.x;

	}
	
	/* returns the y-value of the ball
		output: y-value
	*/
	function getY() {

		return this.y;

	}

	/* returns the radius of the ball
		output: radius
	*/
	function getRadius() {

		return this.radius;

	}
	
	/*Sets the ground to the specified number
		input: number ground, the x position of the plank, the width of the plank
	*/
	function setGround(ground,plankPosX, plankWidth) {

		this.ground = ground;
		this.plankWidth = plankWidth;
		this.plankPosX = plankPosX;

	}
	
	
	/* returns the vertical speed of the ball
		output: vertical speed
	*/
	function getSpeedY() {
		return this.speedY;
	}
	
	/* sets the vertical speed
		input: new speed
	*/
	function setSpeedY(speedY) {
		
		this.speedY = speedY;
	}
	
	/* returns the horizontal speed of the ball
		output: horizontal speed
	*/
	function getSpeedX() {
		return this.speedX;
	}
	
	/* sets the horizontal speed
		input: new speed
	*/
	function setSpeedX(speedX) {
		
		this.speedX = speedX;
	}
	
	//Makes the ball go 10x faster if the s-key is pressed
	function speedUp() {

		if(this.sKey && this.baseSpeed) {

			this.speedY*=10;
			this.speedX*=10;
			this.baseSpeed = false;

		} else if (!this.sKey && !this.baseSpeed) {

			this.speedY = (this.speedY/10);
			this.speedX = (this.speedX/10);
			this.baseSpeed = true

		}

	}
	
	/*Sets a boolean to true or falsebased on if the s-key is pressed
		input: boolean
	*/
	function setSKey(sKey) {

		this.sKey = sKey;

	}

	
	//Reverses the vertical speed 
	function turnY() {
		
		this.speedY*=-1;
		
	}
	
	//Reverses the horizontal speed 
	function turnX() {
		
		this.speedX*=-1;
		
	}

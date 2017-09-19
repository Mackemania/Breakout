	/*
	Creates a plank
	Contains the functions:
	-drawPlanka (Draws the plank)
	-movePlanka (moves the plank)
	-getX (returns the x-value of the plank)
	-getY (returns the y-value of the plank)
	-getWidth (returns the width of the plank)
	-getHeight (returns the height of the plank)
	-reSize (changes with of plank with multiplier)
	-normalSize (sets the width of plank back to normal)

	*/
	var x;
	var y;
	var width;
	var height;
	var left;
	var right;
	var speed;
	var xSize = 0.1;
	var debug = false;
	var reSized = false;
	var resetTimer = 0;

	//constructor
	function Planka (x) {
		this.x = x;
		this.xSize = xSize;
		this.y = (canvas.height-canvas.height*0.08);
		this.width = canvas.width*xSize;

		this.height = canvas.height*0.03;
		this.speed = (canvas.width*0.002)*2;

		this.drawPlanka = drawPlanka;
		this.movePlanka = movePlanka;
		this.getX = getX;
		this.setX = setX;
		this.getY = getY;
		this.getWidth = getWidth;
		this.getHeight = getHeight;
		this.reSize = reSize;
		this.normalSize = normalSize;
		this.debug = debug;
		this.reSized = reSized;
		this.resetTimer = resetTimer;
	}

	/*moves the plank right and left
		input: boolean right, boolean left
	*/
	function movePlanka(left, right) {
		this.left = left;
		this.right = right;

		if (left && !right && this.x > 0) {//If Moving Left And Not Right And Position Not Lower Than 0

			this.x-=this.speed;

		} else if (right && !left && this.x < canvas.width - this.width) { //-:- And Position Not Higher Tahn canvas width - Plank width

			this.x+=this.speed;

		}

	}

	//Draws the plank
	function drawPlanka(debug) {
		this.debug = debug;
		if (this.debug) {
			context.fillStyle="red";
		}
		else{
			context.fillStyle="#FFFFFF";
		}

		context.beginPath();
		context.rect(this.x, this.y, this.width, this.height);
		context.fill();
	}

	/* returns the x-value of the plank
		output: x-value

	*/
	function getX() {

		return this.x;
	}

	/* sets the x-value of the plank
		input: x-value
	*/
	function setX(x){

		this.x = x;

	}

	/* returns the y-value of the plank
		output: y-value

	*/
	function getY() {

		return this.y;

	}
	/*returns the width
		output: width of the plang

	*/
	function getWidth() {
		return this.width;
	}

	/*returns the height
		output: height of the plang

	*/
	function getHeight() {

		return this.height;
	}

	/*Changes width of plank with multiplier
		input: multiplier;
	*/
	function reSize(multiply){
		this.width = canvas.width*multiply;
		this.reSized = true;
	}

	//Changes plank back to normal size
	function normalSize(){
		this.width = canvas.width*this.xSize;
	}

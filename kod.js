		/*
		Runns the game, and makes all things happen
		Contains the functions:
		-getScreenSize (Changes the canvas size based on how big the screen is)
		-init (initializes the program, creating the ball, plank, and blocks)
		-gameController ()
		-gameLoop (runns the game, clocking everything that should happen)
		-draw (collective draw function that contains all the other draw functions)
		-collision (collective collision function that contains all the other collision functions)
		-plankCollision (checks collision with plank)
		-blockCollision (checks collision with blocks)
		-drawString (draws a string)
		-addScore ()
		-eventListener (keyhandeler)
		-lifeSystem ()
		-stopGame (Stops the game)

		*/
		var left = false;
		var right = false;
		var width;
		var height;
		var GLSleep = 1;
		var sKey;
		var game;
		var GameStarted;
		var block;
		var rows = 10;
		var columns = 28;
		var b;
		var yHitTimer = 0;
		var xHitTimer = 0;
		var cPoints;
		var context;
		var score = 0;
		var hitplank = false;
		var hitPoints = 0;
		var canAddScore = true;
		var BlockWorth = 250;
		var life = 3;
		var tLife; //For Drawing same amount hearts as life
		var kill = false;
		var heart;//ForDrawing Hearts
		var Name = "";
		var debug = false;
		var canEnterName = true;
		var resetTimer;
		var pu;
		var puIntervall = 0;
		var canSpawnPUTimer = 0;
		var canSpawnPUBool = false;
		var red =  150;
		var green = 0;
		var blue = 150;
		var rCounter = 16;
		var gCounter = 0;
		var bCounter = -16;
		var blocks;
		var baseSpeed = 3;
		var sticky = false;
		var stickyCounter = 0;
		var stuck = false;
		var stuckDistance;
		var colorChange = 5;
		var ghostball = false;
		var ghostCounter = 0;
		var win = false;
		var blocksLeft = 280;
		var sent = false;
		keyCodeEnum = { //JS code Replacement
			backSpace : 8,
			tab : 9,
			clear : 12, //numlock off + 5
			enter : 13,
			shift : 16,
			lCtrl : 17,
			alt : 18,
			capsLock : 20,
			escape : 27,
			spaceBar : 32,
			pageUp : 33,
			pageDown : 34,
			end : 35,
			home : 36,
			lArrow : 37,
			uArrow : 38,
			rArrow : 39,
			dArrow : 40,
			insert : 45,
			delete : 46,
			0 : 48,
			1 : 49,
			2 : 50,
			3 : 51,
			4 : 52,
			5 : 52,
			6 : 54,
			7 : 55,
			8 : 56,
			9 : 57,
			A : 65,
			B : 66,
			C : 67,
			D : 68,
			E : 69,
			F : 70,
			G : 71,
			H : 72,
			I : 73,
			J : 74,
			K : 75,
			L : 76,
			M : 77,
			N : 78,
			O : 79,
			P : 80,
			Q : 81,
			R : 82,
			S : 83,
			T : 84,
			U : 85,
			V : 86,
			W : 87,
			X : 88,
			Y : 89,
			Z : 90,
			numpad0 : 96,
			numpad1 : 97,
			numpad2 : 98,
			numpad3 : 99,
			numpad4 : 100,
			numpad5 : 101,
			numpad6 : 102,
			numpad7 : 103,
			numpad8 : 104,
			numpad9 : 105,
			multiply : 106,
			add : 107,
			subtract : 109,
			decimalPoint : 110,
			divide : 111,
			f1 : 112,
			f2 : 113,
			f3 : 114,
			f4 : 115,
			f5 : 116,
			f6 : 117,
			f7 : 118,
			f8 : 119,
			f9 : 120,
			f10 : 121,
			f11 : 122,
			f12 : 123,
			numLock : 144,
			equalSign : 187,
			backSlash : 220,
		}
		GameControllEnum = 0;//For Switching Scenes
		ImageHolderEnum = {
			Heart : 'Texture/DeadAlive/LEVANDE1.png',
			Ball : '',
			Plank : '',
			PowerUp1 : 'Texture/PowerUp/PowerUp01.png',
		}

		//Changes Height And Width of canvas based on webpage size
		function getScreenSize() {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
			var canvas = document.getElementById("canvas");


			height-=17;
			width-= 17;

			if(height<(width*(9/16))) {

				width = height*(16/9);

			} else if (width<(height*(16/9))) {

				height = width*(9/16);

			}

			canvas.setAttribute("width", width);
			canvas.setAttribute("height", height);
			init();
		}
		//Initialise everything
		function init() {
			this.game = true;
			this.GameStarted = false;
			canvas = document.getElementById("canvas");
			this.context = canvas.getContext("2d");
			this.tLife = this.life;
			heart = new Array();
			pu = new PowerUp(canvas.Width,400,0,200,500,this.ImageHolderEnum.PowerUp1,this.canvas,this.context);
			
			for (var i = 0; i < this.tLife; i++) {
				heart.push(new Heart(i,this.ImageHolderEnum.Heart,0,0,this.canvas,this.context,this.tLife));
			}
			p = new Planka((this.width/2)-10);
			b = new Ball((p.x + (p.width/2)), (p.y - (p.height*1)), width, height);
			block = new Array();
			this.blocks = this.columns*this.rows
			for(var x = 0; x<this.columns; x++) {
				block[x] = new Array();
				for(var y = 0; y<rows; y++) {

					block[x][y] = new Block(x*(this.width/this.columns), (y*(this.height/30)), this.width, this.height, columns, rows);
					
				}
			}
			
			gameController();
		}
		function gameController(){
			switch(GameControllEnum){
				case 0://Menu
				gameLoop();
				break;
				case 1://Ingame
				gameLoop();
				break;
			}
		}

		//The gameloop triggers everything that should happen
		function gameLoop() {
			//Press Space in KeyHandler
			if (this.GameStarted) {
				
				if(this.blocksLeft == 0 && !sent) {
					this.win = true;
					
					if (this.hitPoints != 0 && this.hitPoints <= 1 && this.canAddScore) { //Ammount of Blocks That Has Been Hit And If It Can Be Added/Not
						addScore(this.BlockWorth); //Adds 250 Only
						this.canAddScore = false;
					} else if(this.hitPoints > 1 && this.canAddScore){
						var ac = this.BlockWorth * (hitPoints * 1.5); //Bonus Points
						addScore(ac); //Adds Original Score(250) With amount of extra points times 1.5 making blocks more Worth foreach block hitted in one run
						this.canAddScore = false;
					}
				
					this.hitPoints = 0; //Reset Hitpoints When Score Has Been Added When Ball Hits Plank
					InsertHighscore(this.Name,this.score);
					this.sent = true;
					
				}
				
				if(this.Name == "DEMO") {
					if(b.getX()<(p.getX()+15)) {
						left = true;
						
					} else {
						left = false;
					}
					
					if (b.getX()>(p.getX()+p.getWidth()-15)) {
						right = true;
						
					} else {
						
						right = false;
					}
					this.sticky = false;
					
				}
				p.movePlanka(left, right);
				
				//console.log(this.stuck);
				if(!this.stuck) {
					b.moveBall(this.debug);
				} else  {
					
					b.followPlank(p.getX()+this.stuckDistance, p.getY()-10);
				}
				
				if(b.getY()> this.height) {
					
					lifeSystem();
				}
				if (this.sticky) {
					
					this.stickyCounter++;
					
					if(this.stickyCounter>3000) {
					
					this.sticky = false;
					this.stickyCounter = 0;
					this.stuck = false;
					}
				}
				
				if(this.ghostball) {
					
					this.ghostCounter++;
					
					if(this.ghostCounter > 750) {
						this.ghostCounter = 0;
						this.ghostball = false;
						
					}
					
				}
				
				b.setSKey(sKey);
				collision();
				b.speedUp();
				if (!this.canSpawnPUBool) {
					//console.log(this.canSpawnPUTimer);
					this.canSpawnPUTimer++;
					if (this.canSpawnPUTimer == 200) {
						this.canSpawnPUBool = !this.canSpawnPUBool;
					}
				}
				if (this.canSpawnPUBool) {
						this.puIntervall++;
				}
			}
			if (!this.GameStarted) { //Pre-Game Stuff
				p.movePlanka(left, right); //Movement of Plank
				var x = p.x + (p.width/2); //Planks X pos
				var y = p.y - (p.height*1) //Planks Y pos
				b.followPlank(x,y); //Follows Plank In Pregame, Can Be Used For Power Up
				
				if(this.Name == "DEMO") {
					this.GameStarted = true;
					
				}
				
			}
			draw();
			this.yHitTimer++;
			this.xHitTimer++;

			if(this.game) {
				setTimeout("gameLoop();", GLSleep);
			}
		}

		//Draws Everything
		function draw() {
			if (this.game) {
				switch(this.GameControllEnum){
					case 0://Menu
					var background = new Image();
					background.src= "Texture/screen/StartScreen.jpg";
					context.drawImage(background, 0, 0, this.width, this.height);
					
					drawString();
					break;
					case 1:
					if (this.debug) {
						context.fillStyle="black";
						context.fillRect(0,0,canvas.width,canvas.height);
					}
					else{
						background = new Image();
						if(!win) {
						background.src="Texture/screen/background.png";
						} else {
							background.src="Texture/screen/win.png";
						}
						context.drawImage(background, 0,0, canvas.width, canvas.height);
					}
					
					for (var i = 0; i < this.tLife; i++) {
						heart[i].DrawHeart();
					}
					p.drawPlanka(this.debug);
					b.drawBall();
					
					for(var x = 0; x<this.block.length; x++) {
						for(var y = 0; y<this.block[x].length; y++) {
							
								red+=rCounter;
								green+= gCounter;
								blue+= bCounter;
								//console.log(rCounter, gCounter, bCounter);
								//console.log(red, green, blue);
								if(red >= 255 && !(green>= 255)) {
									rCounter = 0;
									gCounter = this.colorChange;
									bCounter = -this.colorChange;
								} else if (green >= 255 && !(blue>= 255)) {
									rCounter = -this.colorChange;
									gCounter = 0;
									bCounter = this.colorChange;
									
								} else if (blue >= 255 && !(red>=255)) {
									rCounter = this.colorChange;
									gCounter = -this.colorChange;
									bCounter = 0;
								}
								
								var color ="rgb("+red+", "+green+", "+blue+")";
								
							if(!this.block[x][y].isDead()) {
								
								
								//console.log(color);
								
								this.block[x][y].drawBlock(this.debug, color);
							}
						}

					}
					pu.Draw(this.debug);
					//console.log(this.puIntervall);
					if (this.puIntervall == 1000) {
						//alert("Jump Me");
						pu.canInteract = true;
						pu.randomPos();
						this.puIntervall = 0;
					}
					drawString("Score: ");
					break;
				}
			}
		}
		function RandomPosMaker(){
			pu.randomPos();
		}
		//collecteed collision functions
		function collision() {
			plankCollision();
			blockCollision();
			powerUpCollision();
		}

		//Draws text on screen
		function drawString(){
			switch (GameControllEnum) {
				case 0: //Menu
				var ctx = this.context;
				if (this.canEnterName) {
					//Enter Name
					var fontSize = Math.round(0.043*this.height);
					ctx.font=fontSize+"px breakoutFont";
					ctx.fillStyle="black";
					var xPos = (canvas.width/2-(ctx.measureText(this.Name).width/2));
					var yPos = this.height/3;
					ctx.fillText(this.Name,xPos,yPos); //Text/x-Pos/y-Pos
				} else {
					/*
					ctx.font="30px breakoutFont";
					ctx.fillStyle="black";
					var xPos = 0;//(canvas.width/2) - (ctx.measureText(text).width/2);
					var yPos = 40;//ctx.measureText(text).height;
					ctx.fillText("Name: " + this.Name,xPos,yPos); //Text/x-Pos/y-Pos

					//Press SpaceTo Start String
					var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
					gradient.addColorStop("0","magenta");
					gradient.addColorStop("0.5","blue");
					gradient.addColorStop("1.0","red");
					// Fill with gradient
					ctx.fillStyle=gradient;
					var xPos2 = 0;
					ctx.fillText("Press Space To Start",xPos2,80);
					*/
				}
					break;
					
					case 1: //Ingame
					var ctx = this.context;
					ctx.font="30px breakoutFont";
					ctx.fillStyle="#FFFFFF";
					var xPos = 40;//(canvas.width/2) - (ctx.measureText(text).width/2);
					var yPos = 40;//ctx.measureText(text).height;
					ctx.fillText("Score: " + this.score,xPos,yPos); //Text/x-Pos/y-Pos

					if (this.debug) {
					ctx.font="40px breakoutFont";
					ctx.fillStyle="#FF69B4";
					var xPos = 0;//(canvas.width/2) - (ctx.measureText(text).width/2);
					var yPos = 40;//ctx.measureText(text).height;
					ctx.fillText("DEBUG MODE",(canvas.width/2)-200,60); //Text/x-Pos/y-Pos
					//ctx.lineWidth="8";
					ctx.beginPath();
					ctx.rect(b.middleOfBall,p.y,2,b.by-p.y);
					ctx.stroke();
					ctx.fill();
					ctx.beginPath(),
					ctx.lineWidth="2";
					ctx.strokeStyle="blue";
					ctx.rect(p.x,p.y-50,p.width/3,60);//plank x
					ctx.stroke();
					ctx.beginPath(),
					ctx.lineWidth="2";
					ctx.strokeStyle="red";
					ctx.rect(p.x + (p.width/3),p.y-50,p.width/3,60);
					ctx.stroke();
					ctx.beginPath(),
					ctx.lineWidth="2";
					ctx.strokeStyle="yellow";
					ctx.rect(p.x + (p.width/3)*2,p.y-50,p.width/3,60);
					ctx.stroke();
					ctx.font="30px breakoutFont";
					ctx.fillStyle="#FF69B4";
					var xPos = 0;//(canvas.width/2) - (ctx.measureText(text).width/2);
					var yPos = 40;//ctx.measureText(text).height;
					ctx.fillText("BallX Speed: " + b.speedX,xPos,400);
					ctx.fillText("BallY Speed: " + b.speedY,xPos,440);
				}
					break;
			}

		}

		/*Add score to players gameplay
			input: amount of points
		*/
		function addScore(amount){
				var amount = amount;
				this.score+=amount;
				this.hitPoints == 0;
		}

		//Blocks collision with ball
		function blockCollision() {

			var ballX = Math.round(b.getX());
			var ballY = Math.round(b.getY());
			var ballRadius = b.getRadius();
			var c = new Circle(ballX, ballY, ballRadius);
			var points = c.getPointsInCircle();
			var speedX = b.getSpeedX();
			var speedY = b.getSpeedY();
			cPoints = points;

			for(var x = 0; x<block.length; x++) {
				for(var y = 0; y<block[x].length; y++) {

					if(!block[x][y].isDead()) {

						var edge = block[x][y].isPointsOnEdge(points);
						if(edge != -1) {

							//console.log(edge, speedY);
							if(edge == 0 || edge == 1) {
								if (xHitTimer>=1) {
									if(!this.ghostball) {
										b.turnX();
									}
									xHitTimer = 0;
									block[x][y].hit();
									this.blocksLeft--;
									this.hitPoints++;//For Bonus Points
									this.canAddScore = true;//Bool So It Doesnt Add Point In Random
								}
								

							} else if (edge== 2 && speedY>0) {
								
								
								if (yHitTimer>=1) {
									if(!this.ghostball) {
										b.turnY();
									}
									yHitTimer = 0;
									block[x][y].hit();
									this.blocksLeft--;
									this.hitPoints++;//For Bonus Points
									this.canAddScore = true;//Bool So It Doesnt Add Point In Random

								}

								//Cornercollision detector
							} else if(edge == 3 && speedY<0) {
								//console.log(yHitTimer);
								if (yHitTimer>=1) {
									if(!this.ghostball) {
										b.turnY();
									}
									yHitTimer = 0;
									block[x][y].hit();
									this.blocksLeft--;
									this.hitPoints++;//For Bonus Points
									this.canAddScore = true;//Bool So It Doesnt Add Point In Random

								}
								
								
							}/*else if (edge == 4) {
								cornerPoints = block[x][y].getCornerPoints();
								temp = new Array();
								if(speedX<0 && speedY<0) {
									//temp[0] = cornerPoints[1];
									//temp[1] = cornerPoints[2];
									temp[0] = cornerPoints[3];
									cornerPoints = new Array();
									cornerPoints = temp;

								} else if(speedX>0 && speedY<0) {
									//temp[0] = cornerPoints[0];
									temp[0] = cornerPoints[2];
									//temp[2] = cornerPoints[3];
									cornerPoints = new Array();
									cornerPoints = temp;

								} else if (speedX<0 && speedY>0) {
									//temp[0] = cornerPoints[0];
									temp[0] = cornerPoints[1];
									//temp[2] = cornerPoints[3];
									cornerPoints = new Array();
									cornerPoints = temp;

								} else if( speedX>0 && speedY>0) {
									temp[0] = cornerPoints[0];
									//temp[1] = cornerPoints[1];
									//temp[2] = cornerPoints[2];
									cornerPoints = new Array();
									cornerPoints = temp;

								}

								for(var cornerPCounter = 0; cornerPCounter<cornerPoints.length; cornerPCounter++) {
									for(var pCounter = 0; pCounter<points.length; pCounter++) {

										if(cornerPoints[cornerPCounter].isPointsEqual(points[pCounter])) {
											if(hitTimer>=5) {

												/*
												var cX = cornerPoints[cornerPCounter].getX();
												var cY = cornerPoints[cornerPCounter].getY();

												var ny = ballY-cY;
												var nx = ballX-cX;
												//console.log(nx);
												nx = nx/ballRadius;
												ny = ny/ballRadius;


												var bounce = speedX*nx+speedY*ny;

												b.setSpeedX(speedX-2*bounce*nx);
												b.setSpeedY(speedY-2*bounce*ny);

												block[x][y].hit();



											}

										}

									}

								}
							}
							*/
						} else {

						}

					}

				}

			}

		}

		//planks collision with ball
		function plankCollision() {
			var px = p.getX();
			var py = p.getY();
			var pw = p.getWidth();
			var ph = p.getHeight();
			var bx = b.getX();
			var by = b.getY();
			var br = b.getRadius();
			var bSY = b.getSpeedY();
			var bSX = b.getSpeedX();
			
			if((bx+br)>= px && (bx-br)<=(px+pw) && (by+br)>py && (by+br)<(py+10)) {
				
				
				if(bSX == 0) {
					bSX = 0.01;
				}
				//var inV = bSY/bSX;
				//inV = (Math.atan(inV));
				var distanceToMiddle = bx-(px+(pw/2));
				var v = (Math.PI/3);
				
				v*=((distanceToMiddle/(pw/2)));
				v-=(Math.PI/2);
				//v+= inV;
				if(v>(Math.pi/2)) {
					v = 4*(Math.pi/10);
				} else if(v<(-Math.pi/2)) {
					v = -4*(Math.pi/10);
				}
				//console.log(v);
				bSY = Math.sin(v)*this.baseSpeed;
				bSX = Math.cos(v)*this.baseSpeed;
				
				b.setSpeedX(bSX);
				b.setSpeedY(bSY);
				
				if (this.sticky) {
					this.stuck = true;
					//console.log("px: "+px, "dTM"+distanceToMiddle, "PW"+pw, "ball"+bx);
					b.followPlank((px+distanceToMiddle+(pw/2)), (py-7));
					this.stuckDistance = bx-px;
				}
				
			}
			
			if((bx+br)>= px && (bx-br)<=(px+pw) && (by+br) >= 500) { //Check If Inside Planks X Cordinate And Over 400 Pixels In Canvas (Close To Plank)
				b.setGround(py,px,pw);
				
				if (this.hitPoints != 0 && this.hitPoints <= 1 && this.canAddScore) { //Ammount of Blocks That Has Been Hit And If It Can Be Added/Not
					addScore(this.BlockWorth); //Adds 250 Only
					this.canAddScore = false;
				}
				else if(this.hitPoints > 1 && this.canAddScore){
					var ac = this.BlockWorth * (hitPoints * 1.5); //Bonus Points
					addScore(ac); //Adds Original Score(250) With amount of extra points times 1.5 making blocks more Worth foreach block hitted in one run
					this.canAddScore = false;
				}
				this.hitPoints = 0; //Reset Hitpoints When Score Has Been Added When Ball Hits Plank
			} else {
				b.setGround(this.height);
			}
		}
		
		function powerUpCollision(){
			var ctx = this.context;
			//alert("Here Atleast");
			var powerX = pu.imagePosX;
			var powerY = pu.imagePosY;
			var powerW = pu.imageWidth;
			var powerH = pu.imageHeight;
			var ballX = b.getX();
			var ballR = b.getRadius();
			var ballY = b.getY();
			//console.log("BallX: " + ballX + " BallY: " + ballY);
			//console.log(powerX);
			//console.log(ballX+ballW);
			//console.log(powerX, powerW);
			if (pu.canInteract) {
				
				if(ballX >powerX && ballX<(powerX+powerW) && ballY>powerY && ballY<(powerY+powerH)) {
					var slump = Math.random();
					//console.log(slump);
					if(slump<(1/3)) {
						p.reSize(0.2);
					} else if (slump<(2/3)){
						sticky = true;
						stickyCounter = 0;
					} else if (slump<1) {
						ghostball = true;
						ghostCounter = 0;
					} /*else if (slump <1 && life<3) {
						life++;
						console.log(life);
					}*/
					pu.canInteract = false;
					//alert(pu.canInteract);
				}
				
			}

			if (!pu.canInteract) {
				this.resetTimer++;
				if (this.resetTimer == 2000) {
					//console.log(this.resetTimer);
					pu.canInteract = true;
					//p.normalSize();
				}
			}
		}
		//listens to the keyboard if a key is pressed
		window.addEventListener("keydown", function(e)  { //KeyPress Eventlisener
			e = window.event;
			var keypress = e.keyCode;
			switch (GameControllEnum) {
				case 0: //Menu
					if (this.canEnterName) { //Looks Through The Enum Of Keys And Checks Its String, Then Adds It To Var Name
						Object.keys(keyCodeEnum).some(function (k) {//65-90
						if (keyCodeEnum[k] === keypress && keypress >= 65 && keypress <= 90 && (this.Name.length<10)) {
								this.Name += k;
						}
						});
						if (keypress == keyCodeEnum.backSpace) {
							this.Name = this.Name.slice(0,-1);
						}
						if (keypress == keyCodeEnum.enter) {
							if (this.Name != "") {
									this.canEnterName = false;
									this.GameControllEnum = 1;
							}
						}
					}
				break;
				case 1: //Ingame
					if (keypress == this.keyCodeEnum.lArrow) { //Left Arrow

						left = true;

					} else if (keypress == this.keyCodeEnum.rArrow) {//Right Arrow

						right = true;

					} else if (keypress == this.keyCodeEnum.S) { //SuperSpeed

						sKey = true;

					}
					if (keypress == this.keyCodeEnum.U) { //Debug
						//alert(b.middleOfBall/b.plankWidth);
						this.debug = !this.debug;
						alert(this.debug);
					}
					if (this.GameStarted) {
						if (keypress == this.keyCodeEnum.I) {//Debug Button
							//lifeSystem();
							//console.log(heart[0].dead);
							//p.reSize(0.2);

						}
						if (keypress == this.keyCodeEnum.T) { //Debug

							p.normalSize();
						}
						if (keypress == this.keyCodeEnum.A) {
							pu.imagePosX--;
						}
						if (keypress == this.keyCodeEnum.D) {
							pu.imagePosX++;
						}

					}
					if(keypress == this.keyCodeEnum.spaceBar){//SpaceBar KeyHandler
					
						if (!this.GameStarted) {
							this.GameStarted = true;
						}
						
						if (this.GameStarted) {//For StickyPlank Or Debug
							this.stuck = false;
						}
					}
				break;
				case 2:
				break;
			}
		})

		//listens to the keyboard if a key is released
		window.addEventListener("keyup", function(e)  { //KeyUp Eventlisener
			e = window.event;
			var keypress = e.keyCode;
			switch (GameControllEnum) {
				case 0: //Menu
				if (keypress == this.keyCodeEnum.spaceBar && !this.canEnterName) {
					/*
					this.GameControllEnum = 1;
					*/
				}
					break;
					case 1: //Ingame
					if (keypress == this.keyCodeEnum.lArrow) { //Left Arrow

						left = false;

					} else if (keypress == this.keyCodeEnum.rArrow) {//Right Arrow

						right = false;
					}
					if (keypress == this.keyCodeEnum.S) {//S Button

						sKey = false;
					}
					if (keypress == this.keyCodeEnum.escape) {
						location.replace("index.php");
					}
					break;
			}
		})


		function lifeSystem() {
				//alert(this.heart[this.life-1].dead);
		    if (this.life!=1){
				this.heart[this.life-1].dead = true;
				this.life-=1;
					//alert(this.life);
				this.GameStarted = false;
				b.setSpeedX(0.001);
				b.setSpeedY(3);
				b.followPlank(p.getX(), p.getY());
		    }
		    else { //When Dead
				alert("You Died!!!!!");
					if(!win) {
						InsertHighscore(this.Name,this.score);
					}
					this.game = false;
					location.replace("index.php");
		    }
		//location.reload();
		/*Här skall Mikaels kod implementeras.*/
		}
		function stopGame() {
		 this.game = false;
	 } //Stops Everything

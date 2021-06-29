GameStatus = ""
wristX = ""
wristY = ""
score_wrist = ""

function preLoad(){
	ball_touch_paddel = loadSound("ball_touch_paddel.wav"); 
	missed = loadSound("missed.wav");
}


function startGame() {
	GameStatus = "start";
	document.getElementById("status").innerHTML = "Game Is Loaded";
}


function setup() {
	canvas = createCanvas(1240, 336);
	canvas.parent('canvas');

	instializeInSetup();

	video = createCapture(VIDEO);
	video.size(800, 400);
	video.parent('game_console');

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);

}

function restart() {
	restart()
}

function gotPoses(results) {
	if (results.length > 0) {
		wristX = results[0].pose.rightWrist.x
		wristY = results[0].pose.rightWrist.y
		score_wrist = results[0].pose.keypoints[10].score


	}
}

function draw() {
	background(0); 
	image(video, 0, 0, 700, 600); 
	fill("black"); 
	stroke("black"); 
	rect(680, 0, 20, 700); 
	fill("black"); 
	stroke("black");
	rect(0, 0, 20, 700);
	if (GameStatus == "start") {
		if (score_wrist > 0.2) {
			fill('red')
			stroke("red")
			circle(wristX, wristY, 30)
		}
	}
}
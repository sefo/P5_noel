var angle = 0;
var slider;
var quantity = 500;
var xPosition = [];
var yPosition = [];
var flakeSize = [];
var direction = [];
var minFlakeSize = 1;
var maxFlakeSize = 8;
var snowColor = 255;

// sound      D   E   F#   G   A
var notes = [ 62, 64, 66, 67, 69];
var song = [
  { note: 1, duration: 200, display: "E" },
  { note: 2, duration: 200, display: "F#" },
  { note: 3, duration: 800, display: "G" },
  { note: 0, duration: 200, display: "D" },
  { note: 3, duration: 200, display: "G" },
  { note: 4, duration: 1000, display: "A" },
  { note: 3, duration: 200, display: "G" },
  { note: 1, duration: 200, display: "E" },
  { note: 1, duration: 200, display: "E" },
  { note: 1, duration: 200, display: "E" },
  { note: 1, duration: 200, display: "E" },
  { note: 1, duration: 200, display: "E" },
  { note: 2, duration: 200, display: "F#" },
  { note: 3, duration: 1500, display: "G" },
  { note: 1, duration: 200, display: "E" },
  { note: 2, duration: 200, display: "F#" },
  { note: 3, duration: 800, display: "G" },
  { note: 0, duration: 200, display: "D" },
  { note: 3, duration: 200, display: "G" },
  { note: 4, duration: 1000, display: "A" },
  { note: 3, duration: 200, display: "G" },
  { note: 1, duration: 200, display: "E" },
  { note: 1, duration: 200, display: "E" },
  { note: 1, duration: 200, display: "E" },
  { note: 1, duration: 200, display: "E" },
  { note: 1, duration: 200, display: "E" },
  { note: 2, duration: 200, display: "F#" },
  { note: 3, duration: 1500, display: "G" }
];
var index = 0;
var trigger = 0;
var osc;

function setup() {
	osc = new p5.TriOsc();
	osc.start();
	osc.amp(0);
	
	createCanvas(1400, 600);
	stroke('white');
	slider = createSlider(0, TWO_PI, PI / 4, 0.01);
	
	for(var i = 0; i < quantity; i++) {
		flakeSize[i] = round(random(minFlakeSize, maxFlakeSize));
		xPosition[i] = random(0, width);
		yPosition[i] = random(0, height);
		direction[i] = round(random(0, 1));
	}

}

function draw() {
	if(index > song.length-1)
		index = 0;
	if(millis() > trigger) {
		playNote(notes[song[index].note], song[index].duration);
		trigger = millis() + song[index].duration;
		index ++;
	}
	
	background(100,150,200);
	joyeuxNoel();
	snowMan();
	neige();
	var length = 200;
	translate(700, height);
	branche(length, 10);
}

function branche(length, weight) {
	if(weight < 1) {
		weight = 1;
		var fruit = random(0, 1000);
		if(fruit % 2) {
			stroke('red');
			ellipse(0, 0, random(1,5), random(1,5));
		}
	}
	if(weight < 3)
		stroke('green');
	strokeWeight(weight);
	angle = slider.value();
	line(0, 0, 0, -length);
	translate(0, -length);
	if(length > 4) {
		push();
		rotate(angle);
		branche(length*0.67, weight-1);
		pop();
		push();
		rotate(-angle);
		branche(length*0.67, weight-1);
		pop();
	}
}

function joyeuxNoel() {
	push();
	strokeWeight(random(2, 5));
	stroke(color(255, random(0, 255), random(0, 255)));
	textSize(random(25, 30));
	text("JOYEUX\n\nNOEL\n\nANAIS", 100, 100);
	pop();
}

function neige() {
	push();
	noStroke();
	fill(snowColor);
	for(var i = 0; i < xPosition.length; i++) {
		ellipse(xPosition[i], yPosition[i], flakeSize[i], flakeSize[i]);
		if(direction[i] == 0) {
			xPosition[i] += map(flakeSize[i], minFlakeSize, maxFlakeSize, .1, .5);
		} else {
			xPosition[i] -= map(flakeSize[i], minFlakeSize, maxFlakeSize, .1, .5);
		}
		yPosition[i] += flakeSize[i] + direction[i]; 
		if(xPosition[i] > width + flakeSize[i] || xPosition[i] < -flakeSize[i] || yPosition[i] > height + flakeSize[i]) {
			xPosition[i] = random(0, width);
			yPosition[i] = -flakeSize[i];
		} 
	}
	pop();
}

function snowMan() {
	push();
	noStroke();
	var centerX = 200;
	var centerY = 490 + 30;
	var offsetHand = 30;
	stroke(210);
	fill(snowColor);
	ellipse(centerX,580,100,100);
	ellipse(centerX,centerY,80,80);
	ellipse(centerX,450,60,60);
	line(centerX-100,centerY-offsetHand,centerX-40,centerY - 15);
	line(centerX+100,centerY-offsetHand,centerX+40,centerY - 15);
	pop();
}

function playNote(note, duration) {
	osc.freq(midiToFreq(note));
	osc.fade(0.5,0.2);
	if (duration) {
		setTimeout(function() {
			osc.fade(0,0.2);
		}, duration-50);
	}
}
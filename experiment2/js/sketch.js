/* exported setup, draw */


let seed = 239;
let clouds = [];
let flowers = [];
let bushes = []; // Array to store bush objects with vertices

const skyColor = "#69ade4";
const grassColor = "#45CA5A";

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// listener for reimagine button
$("#reimagine").click(function() {
  seed++;
});

function setup() {  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
  
  
  initializeScene();
}

function draw() {
  background(100);
  noStroke();

  // Draw sky
  fill(skyColor);
  rect(0, 0, width, height / 2);

  // Draw grass
  fill(grassColor);
  rect(0, height / 2, width, height / 2);

  // Draw clouds
  fill(255); // White clouds
  clouds.forEach(cloud => {
    drawCloud(cloud.x, cloud.y, cloud.size);
    cloud.x += 0.5;
    if (cloud.x > width) {
      cloud.x = -50;
    }
  });

  // Draw flowers
  flowers.forEach(flower => {
    drawFlower(flower.x, flower.y, flower.color);
  });

  // Draw bushes
  bushes.forEach(bush => {
    drawBush(bush);
  });
}








function initializeScene() {
  randomSeed(seed);
  clouds = [];
  flowers = [];
  bushes = [];

  // Initialize clouds
  for (let i = 0; i < 5; i++) {
    clouds.push({
      x: random(width),
      y: random(height / 4),
      size: random(20, 60)
    });
  }

  // Initialize flowers
  for (let i = 0; i < 20; i++) {
    flowers.push({
      x: random(width),
      y: random(height / 2, height),
      color: color(random(255), random(255), random(255))
    });
  }

  // Initialize bushes with smaller size
  for (let i = 0; i < 10; i++) {
    let vertices = [];
    const numPoints = floor(random(5, 8));
    const bushSize = random(20, 35); // Reduced size range
    for (let j = 0; j < numPoints; j++) {
      const angle = map(j, 0, numPoints, 0, TWO_PI);
      const r = random(bushSize * 0.5, bushSize);
      const px = r * cos(angle);
      const py = r * sin(angle);
      vertices.push({ x: px, y: py });
    }
    bushes.push({
      x: random(width),
      y: random(height / 2, height),
      size: bushSize,
      vertices: vertices
    });
  }
}

function reinitializeScene() {
  seed++;
  initializeScene();
}


function drawCloud(x, y, size) {
  ellipse(x, y, size, size / 2);
  ellipse(x - size / 3, y + size / 6, size / 2, size / 4);
  ellipse(x + size / 3, y - size / 6, size / 2, size / 4);
}

function drawFlower(x, y, color) {
  fill(color);
  ellipse(x, y, 10, 10);  // Flower center
  fill(255);  // White petals
  ellipse(x - 5, y, 5, 5);  // Left petal
  ellipse(x + 5, y, 5, 5);  // Right petal
  ellipse(x, y - 5, 5, 5);  // Top petal
  ellipse(x, y + 5, 5, 5);  // Bottom petal
}

function drawBush(bush) {
  push(); // Use push and pop to isolate transformations
  translate(bush.x, bush.y);
  fill(34, 139, 34); // Set fill color before beginShape
  beginShape();
  bush.vertices.forEach(v => {
    vertex(v.x, v.y);
  });
  endShape(CLOSE);
  pop();
}

function mousePressed() {
  // Check if click is in the sky area
  if (mouseY < height / 2) {
    let newCloud = {
      x: mouseX,
      y: mouseY,
      size: random(20, 60)
    };
    clouds.push(newCloud);
  }
  // Check if click is in the grass area
  else if (mouseY >= height / 2) {
    let newFlower = {
      x: mouseX,
      y: mouseY,
      color: color(random(255), random(255), random(255))
    };
    flowers.push(newFlower);
  }
}
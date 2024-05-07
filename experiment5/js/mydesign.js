/* exported p4_inspirations, p4_initialize, p4_render, p4_mutate */


function getInspirations() {
  return [
    {
      name: "Water Bubbles",
      assetUrl: "https://cdn.glitch.global/a2730838-13cc-40b9-bcf9-30836eb417d1/21256-bigthumbnail.jpg?v=1715106973066",
      credit: "Red soccer ball"
    },
    {
      name: "Moon and Stars",
      assetUrl: "https://cdn.glitch.global/a2730838-13cc-40b9-bcf9-30836eb417d1/OIP.jpg?v=1715113501831",
      credit: "Moon and stars"
    },
    {
      name: "City Skyline",  // Changed from "Yellow Cup" to "City Skyline"
      assetUrl: "https://cdn.glitch.global/a2730838-13cc-40b9-bcf9-30836eb417d1/city-skyline-25.jpg?v=1715108738912",
      credit: "Yellow Cup, Bing Images"
    }
  ];
}function initDesign(inspiration) {
  let canvasContainer = $('.image-container');
  let canvasWidth = canvasContainer.width();
  let aspectRatio = inspiration.image.height / inspiration.image.width;
  let canvasHeight = canvasWidth * aspectRatio;
  resizeCanvas(canvasWidth, canvasHeight);
  $(".caption").text(inspiration.credit);

  const imgHTML = `<img src="${inspiration.assetUrl}" style="width:${canvasWidth}px;">`;
  $('#original').empty();
  $('#original').append(imgHTML);

  let design = {
    bg: 128,
    fg: []
  };

  if (inspiration.name === "City Skyline") {
    let numberOfBuildings = 70;
    let baseWidth = width / numberOfBuildings;
    for (let i = 0; i < numberOfBuildings; i++) {
      let buildingHeight = random(height * 0.1, height * 0.5);
      design.fg.push({
        shape: 'rect',
        x: i * baseWidth,
        y: height - buildingHeight,
        w: baseWidth - 10,
        h: buildingHeight,
        fill: random(50, 200)
      });
    }
  } else if (inspiration.name === "Moon and Stars") {
	  
	  // Increasing the size of the moon
    let moonRadius = width / 8;  // Larger radius for the moon
    design.fg.push({
        shape: 'circle',
        x: width / 2,
        y: height / 2,
        r: moonRadius,
        fill: 255  // White color for the moon
    });


let numberOfStars = 300;  // More stars but smaller
    for (let i = 0; i < numberOfStars; i++) {
        let starX = random(width);
        let starY = random(height);
        let distanceToMoonCenter = dist(starX, starY, width / 2, height / 2);
        
        // Check if the star is outside the moon's area
        if (distanceToMoonCenter > moonRadius + 2) {  // Adding a small buffer to ensure clear separation
            design.fg.push({
                shape: 'circle',
                x: starX,
                y: starY,
                r: random(width / 200, width / 150),  // Smaller stars
                fill: 255  // White color for stars
            });
	}}
    
  
  } else if (inspiration.name === "Water Bubbles") {
    for (let i = 0; i < 50; i++) {
      design.fg.push({
        shape: 'rect',
        x: random(width * 0.1),
        y: random(height),
        w: random(width * 0.1),
        h: random(height / 10),
        fill: 0
      });
      design.fg.push({
        shape: 'rect',
        x: width - random(width * 0.1),
        y: random(height),
        w: random(width * 0.1),
        h: random(height / 10),
        fill: 0
      });
    }
    for (let i = 0; i < 50; i++) {
      design.fg.push({
        shape: 'circle',
        x: width / 2 + random(-width * 0.2, width * 0.2),
        y: random(height),
        r: random(width / 20),
        fill: 255
      });
    }
  } else {
    for (let i = 0; i < 100; i++) {
      design.fg.push({
        shape: 'rect',
        x: random(width),
        y: random(height),
        w: random(width / 2),
        h: random(height / 2),
        fill: random(255)
      });
    }
  }

  return design;
}


function renderDesign(design, inspiration) {
  background(design.bg);
  noStroke();
  for (let shape of design.fg) {
    fill(shape.fill, 128);
    if (shape.shape === 'circle') {
      ellipse(shape.x, shape.y, shape.r * 2); // Drawing circle with diameter
    } else {
      rect(shape.x, shape.y, shape.w, shape.h); // Drawing rectangle
    }
  }
}




function mutateDesign(design, inspiration, rate) {
  // Convert rate from percentage to scale factor
  let mutationScale = rate;

  // Apply mutation to the background and all foreground shapes
  design.bg = mut(design.bg, 0, 255, mutationScale);
  for (let shape of design.fg) {
    shape.fill = mut(shape.fill, 0, 255, mutationScale);
    shape.x = mut(shape.x, 0, width, mutationScale);
    shape.y = mut(shape.y, 0, height, mutationScale);
    shape.w = mut(shape.w, 0, width / 2, mutationScale);
    shape.h = mut(shape.h, 0, height / 2, mutationScale);
  }
}

function mut(num, min, max, rate) {
  // Adjust the standard deviation of the mutation based on the mutation rate
  return constrain(randomGaussian(num, (rate * (max - min)) / 20), min, max);
}



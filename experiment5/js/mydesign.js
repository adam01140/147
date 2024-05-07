/* exported p4_inspirations, p4_initialize, p4_render, p4_mutate */


function getInspirations() {
  return [
    {
      name: "Water On Glass",
      assetUrl: "https://cdn.glitch.global/a2730838-13cc-40b9-bcf9-30836eb417d1/21256-bigthumbnail.jpg?v=1715106973066",
      credit: "Red soccer ball"
    },
    {
      name: "Water On Glass",
      assetUrl: "https://cdn.glitch.global/a2730838-13cc-40b9-bcf9-30836eb417d1/50-502118_delicate-blue-water-droplets-png-download-water-drop.jpg?1715094654450",
      credit: "Water Droplet, Bing Images"
    },
    {
      name: "City Skyline",  // Changed from "Yellow Cup" to "City Skyline"
      assetUrl: "https://cdn.glitch.global/a2730838-13cc-40b9-bcf9-30836eb417d1/city-skyline-25.jpg?v=1715108738912",
      credit: "Yellow Cup, Bing Images"
    }
  ];
}

function initDesign(inspiration) {
  // Set the canvas size based on the container
  let canvasContainer = $('.image-container'); // Select the container using jQuery
  let canvasWidth = canvasContainer.width(); // Get the width of the container
  let aspectRatio = inspiration.image.height / inspiration.image.width;
  let canvasHeight = canvasWidth * aspectRatio; // Calculate the height based on the aspect ratio
  resizeCanvas(canvasWidth, canvasHeight);
  $(".caption").text(inspiration.credit); // Set the caption text

  // Add the original image to #original
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
      let buildingHeight = random(height * 0.1, height * 0.5);  // Adjust the height range for buildings
      design.fg.push({
        shape: 'rect',
        x: i * baseWidth,
        y: height - buildingHeight,  // This places buildings starting from the bottom of the canvas
        w: baseWidth - 10,
        h: buildingHeight,
        fill: random(50, 200)  // Grayscale to simulate building materials
      });
    }
  } else if (inspiration.name === "Water On Glass") {
    // Add black rectangles on the sides
    for (let i = 0; i < 50; i++) {
      design.fg.push({
        shape: 'rect',
        x: random(width * 0.1), // Left side
        y: random(height),
        w: random(width * 0.1),
        h: random(height / 10),
        fill: 0 // Black color
      });
      design.fg.push({
        shape: 'rect',
        x: width - random(width * 0.1), // Right side
        y: random(height),
        w: random(width * 0.1),
        h: random(height / 10),
        fill: 0 // Black color
      });
    } 
  
  
  
  

    // Add white circles in the middle
    for (let i = 0; i < 50; i++) {
      design.fg.push({
        shape: 'circle',
        x: width / 2 + random(-width * 0.2, width * 0.2),
        y: random(height),
        r: random(width / 20),
        fill: 255 // White color
      });
    }
  } else {
    // Default to using rectangles for other inspirations
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



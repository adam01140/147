/* exported p4_inspirations, p4_initialize, p4_render, p4_mutate */


function getInspirations() {
  return [
     {
    
      name: "Red Ball",
      assetUrl: "https://th.bing.com/th/id/R.26f76ee7f7f1ba655fd09efe7b6ae3ff?rik=sO8h12A3QcO9Rg&riu=http%3a%2f%2fpublicdomainpictures.net%2fpictures%2f80000%2fvelka%2fred-soccer-ball.jpg&ehk=CoxjtzR6TWaZ8k5FsGJu0zeGWFsKpk5sGS92es%2f6%2fgY%3d&risl=&pid=ImgRaw&r=0",
      credit: "Red soccer ball"
    },
    {
      name: "Water",
      assetUrl: "https://cdn.glitch.global/a2730838-13cc-40b9-bcf9-30836eb417d1/50-502118_delicate-blue-water-droplets-png-download-water-drop.jpg?1715094654450",
      credit: "Water Droplet, Bing Images"
    },
    {
      name: "Yellow Cup", 
      assetUrl: "https://th.bing.com/th/id/OIP.04k2-Rd_bI9_uwab5Kt3BQHaE8?rs=1&pid=ImgDetMain",
      credit: "Yellow Cup, Bing Images"
    }
  ];
}

function initDesign(inspiration) {
	
	// set the canvas size based on the container
  let canvasContainer = $('.image-container'); // Select the container using jQuery
  let canvasWidth = canvasContainer.width(); // Get the width of the container
  let aspectRatio = inspiration.image.height / inspiration.image.width;
  let canvasHeight = canvasWidth * aspectRatio; // Calculate the height based on the aspect ratio
  resizeCanvas(canvasWidth, canvasHeight);
  $(".caption").text(inspiration.credit); // Set the caption text

  // add the original image to #original
  const imgHTML = `<img src="${inspiration.assetUrl}" style="width:${canvasWidth}px;">`
  $('#original').empty();
  $('#original').append(imgHTML);

  
  

  let design = {
    bg: 128,
    fg: []
  };

  if (inspiration.name === "Water") {
    for (let i = 0; i < 100; i++) {
      design.fg.push({
        shape: 'circle',
        x: random(width),
        y: random(height),
        r: random(width / 4), // radius
        fill: random(255)
      });
    }
  } else if (inspiration.name === "Red Ball") {
    for (let i = 0; i < 100; i++) {
      if (random(1) > 0.5) {
        // Add a circle
        design.fg.push({
          shape: 'circle',
          x: random(width),
          y: random(height),
          r: random(width / 4),
          fill: random(255)
        });
      } else {
        // Add a rectangle
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



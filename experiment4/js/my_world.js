"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

// Enhanced Lava theme colors with more variation
const reds = [
  [255, 69, 0],    // Orange Red
  [255, 99, 71],   // Tomato
  [255, 140, 0],   // Dark Orange
  [255, 165, 0],   // Orange
  [255, 215, 0],   // Gold (brighter and lighter)
  [200, 64, 64], // Light Coral (light red)
  [178, 34, 34],   // Firebrick
  [139, 0, 0],     // Dark Red
];
const grays = [
  [105, 105, 105], // Dim Gray
  [70, 70, 70],    // Darker Gray
  [45, 45, 45],    // Even Darker Gray
  [30, 30, 30],    // Almost Black
  [0, 0, 0],       // Black
];
const colorScale = 0.1;

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
}

function p3_drawBefore() {}

function getNoiseColor(x, y, colorArray, time) {
  // Adding time to create a dynamic effect
  let noiseValue = noise(x * colorScale, y * colorScale, time);
  let index = floor(map(noiseValue, 0, 1, 0, colorArray.length));
  return colorArray[index];
}
function p3_drawTile(i, j) {
  noStroke();
  
  // Calculate a time factor based on the current runtime
  let time = millis() / 10000; // Slow down the time scale

  // Red tiles appear 4 out of 6 times; Grays and Black otherwise
  let tileHash = XXH.h32("tile:" + [i, j], worldSeed) % 6;
  let color;
  if (tileHash > 1) {
    color = getNoiseColor(i, j, reds, time);
  } else {
    color = getNoiseColor(i, j, grays, time);
  }
  fill(...color);

  push();
  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    fill(0, 0, 0, 32);
    ellipse(0, 0, 10, 5);
    translate(0, -10);
    fill(255, 255, 100, 128);
    ellipse(0, 0, 10, 10);
  }

  pop();
}


function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}

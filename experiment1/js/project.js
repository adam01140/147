// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  // create an instance of the class
  let myInstance = new MyProjectClass("value1", "value2");

  // call a method on the instance
  myInstance.myMethod();
  
  
  
  
  
  const fillers = {
  adventurer: ["Chef", "Gastronaut", "Culinary Wizard", "Foodie", "Gourmet", "Snack Seeker", "Taste Tester", "Epicure", "Gourmand", "Palette Pioneer", "Flavor Hunter", "Kitchen Knight"],
  action: ["mix", "combine", "whisk", "blend", "fuse", "marry", "mingle", "meld"],
  ingredient1: ["chocolate", "pickle", "ice cream", "spaghetti", "peanut butter", "marshmallow", "bacon", "cheese", "sushi", "potato chips", "coffee", "maple syrup"],
  ingredient2: ["mustard", "jelly beans", "soda", "hot sauce", "whipped cream", "caviar", "olive oil", "sardines", "honey", "wasabi", "beer", "iceberg lettuce"],
  location: ["from the mystical land of TasteBudtopia", "from the distant Kitchen Kingdom", "from the Snack Shack at the end of the galaxy", "from the legendary Culinaria", "from the secret pantry of Ancient Flavors", "from the depths of the Gourmet Galaxy"],
  outcome: ["deliciously weird", "surprisingly tasty", "an absolute culinary disaster", "a new trendy dish", "bizarre yet brilliant", "weirdly wonderful", "unexpectedly harmonious", "a flavor flop"],
  reward: ["the Golden Spatula", "the title of Flavor Master", "a lifetime supply of snacks", "entry into the Hall of Culinary Weirdness", "the mythical Fork of Yum", "an exclusive cookbook with forbidden recipes"],
};

const template = `Hear ye, hear ye, $adventurer! Your culinary skills are needed. We've received a quest $location, where food combinations have never been bound by logic or reason.

Your mission, should you choose to accept it, is to $action $ingredient1 and $ingredient2 in ways no chef before you has dared. Should you succeed and create something $outcome, you shall be rewarded with $reward. Good luck, and may your flavors be ever in your favor!
`;

// STUDENTS: You don't need to edit code below this line.

const slotPattern = /\$(\w+)/;

function replacer(match, name) {
  let options = fillers[name];
  if (options) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return `<UNKNOWN:${name}>`;
  }
}

function generate() {
  let story = template;
  while (story.match(slotPattern)) {
    story = story.replace(slotPattern, replacer);
  }

  /* global box */
  $("#box").text(story);

}

/* global clicker */
$("#clicker").click(generate);

generate();




}

// let's get this party started - uncomment me
main();
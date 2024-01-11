const sColours = ["yellow", "magenta", "cyan"];
const pColours = ["red", "green", "blue"];
const allColours = [...sColours, ...pColours];

let backgroundColour;
let bottomCanvas;
let topCanvas;

function setup() {
  noLoop();
  createCanvas(400, 400);
  backgroundColour = random(sColours);
  bottomCanvas = createGraphics(width, height);
  topCanvas = createGraphics(width, height);

  topCanvas.noStroke();
  topCanvas.rectMode(CENTER);
  topCanvas.angleMode(DEGREES);
  bottomCanvas.noStroke();
  bottomCanvas.rectMode(CENTER);
  bottomCanvas.angleMode(DEGREES);
  bottomCanvas.blendMode(MULTIPLY);
}

function draw() {
  clear();
  bottomCanvas.clear();
  topCanvas.clear();

  // blendMode(MULTIPLY);
  backgroundColour = random(sColours);
  background(backgroundColour);
  // big circle
  if (random() < 0.2) {
    makeCircle(width, bottomCanvas);
  }
  // diamond
  if (random() < 0.25) {
    diamond(bottomCanvas);
  }

  // lines
  if (random() < 0.95) {
    lines(bottomCanvas);
  }
  // medium circle
  if (random() < 0.25) {
    makeCircle((width * 2) / 3, bottomCanvas);
  }

  // 9 circles
  if (random() < 0.25) {
    manyCircles(3, bottomCanvas);
  }

  // 4 circles
  if (random() < 0.25) {
    manyCircles(2, bottomCanvas);
  }

  // small circle
  if (random() < 0.4) {
    makeCircle((width * 1) / 3, topCanvas);
  }
  // topCanvas.blendMode(HARD_LIGHT);
  image(bottomCanvas, 0, 0);
  image(topCanvas, 0, 0);
}

function makeCircle(size, canvas = null) {
  // not bg colour circle
  canvas.fill(notBgColour(allColours, backgroundColour));
  if (canvas) {
    canvas.fill(notBgColour(allColours, backgroundColour));
    canvas.noStroke();
    canvas.circle(width / 2, height / 2, size);
  } else {
    circle(width / 2, height / 2, size);
  }
}

function manyCircles(number, canvas = null) {
  let circleDiameter = (width - 10) / number;
  canvas.fill(notBgColour(allColours, backgroundColour));
  let fraction = width / number;
  for (let y = 0; y < number; y++) {
    for (let x = 0; x < number; x++) {
      if (x !== 1 || y !== 1 || number === 2) {
        canvas.circle(
          fraction * x + fraction / 2,
          fraction * y + fraction / 2,
          circleDiameter
        );
      }
    }
  }
}

function diamond(canvas = null) {
  canvas.fill(notBgColour(sColours, backgroundColour));
  canvas.push();
  canvas.translate(width / 2, height / 2);
  canvas.rotate(45);

  let w = sin(45) * width * 0.81;
  canvas.square(0, 0, w);
  canvas.pop();
}

function lines(canvas = null) {
  const horizLines = ceil(random(2));
  const vertLines = floor(random(2));

  canvas.fill(notBgColour(allColours, backgroundColour));
  // fill("tomato");
  let fraction = 4.5;
  let lineWeight = height / fraction;
  // if (horizLines == 1) {
  //   startPos = height / 2;
  //   vertPos = height / 2;
  // } else {
  //   vertPos = 0;
  // }
  for (let i = 0; i < horizLines; i++) {
    canvas.rect(width / 2, lineHeight(horizLines, i), width, lineWeight);
  }
  for (let i = 0; i < vertLines; i++) {
    canvas.rect(lineHeight(vertLines, i), height / 2, lineWeight, height);
  }

  function lineHeight(lines, i) {
    let ran = floor(random(3));
    if (ran === 0 && lines === 1) {
      return height / fraction;
    } else if (ran === 1 && lines === 1) {
      return (height * (fraction - 1)) / fraction;
    } else {
      return (height / (lines + 1)) * (i + 1);
    }
  }
}

function mousePressed() {
  redraw();
}

function notBgColour(array, item) {
  const newArray = [...array];
  const index = newArray.indexOf(item);
  if (index > -1) {
    // only splice array when item is found
    newArray.splice(index, 1); // 2nd parameter means remove one item only
  }
  return random(newArray);
}

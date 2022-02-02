function preload() {
  json = loadJSON('tft_objects.json')
}

function setup() {
  console.log(json) 
 
  minX = 50000
  minZ = 50000
  maxX = -50000
  maxZ = -50000

  for (board in json) {
    // console.log(board)
    for(unit of json[board]) {
      // console.log(unit)
      let { x, y, z, name } = unit;
      maxX = max(maxX, x)
      maxZ = max(maxZ, z)
      minX = min(minX, x)
      minZ = min(minZ, z)
    }
  }

  createCanvas(1000, 1000);
}

function translateCoords([x,z]) {
  return [
      50 + 900*(x-minX)/(maxX-minX),
      1000 - (50 + 900*(z-minZ)/(maxZ-minZ))
    ];
}

function draw() {
  background(220);

  push();
  stroke(255,0,0);
  pop();

  for (board in json) {
    for(unit of json[board]) {

      /* minX -> 50, maxX -> 950 */
      [x,y] = translateCoords([unit.x, unit.z]);

      triangle(x-3, y+1, x+3, y+1, x, y-2);

      push();
      textSize(8);
      translate(x,y);
      rotate(30*(2*PI)/360);
      text(unit.name, 5, 5);
      pop();
    }
  }

}
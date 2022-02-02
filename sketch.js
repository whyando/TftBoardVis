const board_locations = {
	x: {
		left: {
			min: 1000,
			max: 4000,
		},
		middle: {
			min: 6000,
			max: 9000,
		},
		right: {
			min: 11000,
			max: 14000,
		}
	},
	z: {
		bottom: {
			min: 1000,
			max: 4000,
			bench_home: 1642,
			bench_away: 3412,
		},
		middle: {
			min: 6000,
			max: 9000,
			bench_home: 6642,
			bench_away: 8412,
		},
		top: {
			min: 11000,
			max: 14000,
			bench_home: 11610,
			bench_away: 13410,
		}
	}
}

function preload() {
  json = loadJSON('tft_objects.json')
}

function setup() {
  console.log(json) 
 
  minX = 0
  minZ = 0
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

function verticalLine(xCoord) {
  [xCoord, ] = translateCoords([xCoord, -1])
  push();
  line(xCoord, 0, xCoord, 1000);
  pop();
}

function horizontalLine(yCoord) {
  [, yCoord] = translateCoords([-1, yCoord])
  push();
  stroke(255, 0, 0);
  line(0, yCoord, 1000, yCoord);
  pop();
}

function draw() {
  background(220);

  verticalLine(board_locations.x.left.min);
  verticalLine(board_locations.x.left.max);
  verticalLine(board_locations.x.middle.min);
  verticalLine(board_locations.x.middle.max);
  verticalLine(board_locations.x.right.min);
  verticalLine(board_locations.x.right.max);

  horizontalLine(board_locations.z.bottom.min);
  horizontalLine(board_locations.z.bottom.max);
  horizontalLine(board_locations.z.middle.min);
  horizontalLine(board_locations.z.middle.max);
  horizontalLine(board_locations.z.top.min);
  horizontalLine(board_locations.z.top.max);

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
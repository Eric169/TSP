var cities = [];

var bestDistance = Infinity;
var distances = [];
const size = 40;

function setup() {
  let w = 1000, h = 600;
  createCanvas(w, h);
  for(var i = 0; i < size; i++){
    var v = createVector(random(width), random(height/2))
    order[i] = i;
    cities[i] = v;
  }
  precalculateDistances();
  createPopulation(order);
}

function draw() {
  background(0);
  fill(255);
  for(var i = 0; i < size; i++){
    ellipse(cities[i].x, cities[i].y, 5, 5);
  }
  //allPermutations();
  geneticAlgo();
}

function factorial(n){
  var fact = 1;
  for(var i = 2; i<=n; i++){
    fact *= i;
  }
  return fact;
}

function precalculateDistances(){
  for(var i = 0; i < size; i++){
    distances[i] = [];
    distances[i][i] = 0;
    for(var j = 0; j < size; j++){
      distances[i][j] = dist(cities[i].x, cities[i].y, cities[j].x, cities[j].y);
    }
  }
}

function distance(){
  var sum = 0;
  for(var i = 0; i < size - 1; i++){
    sum += distances[order[i]][order[i+1]];
  }
  return sum;
}
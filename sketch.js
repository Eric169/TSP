var cities = [];
var distances = [];
const size = 30;
var minimumDistance = 0;

//variables for geneticAlgo
var popSize = 500;
var population = [];
var fitness = [];
var currentBest = [];
var bestEver = [];
var bestDistanceGA = Infinity;

//variables for allPermutations
var orderPermutations = [];
var bestorderPermutations = [];
var iterations = 0;
var fact = factorial(size);
var bestDistancePermutations = Infinity;

//variables for nearest neighbour eutristhic
var bestDistanceNearestNeighbour = Infinity;
var bestOrder = [];

function setup() {
  let w = windowWidth, h = windowHeight;
  let order = [];
  createCanvas(w, h);
  for(var i = 0; i < size; i++){
    var v = createVector(random(width/2), random(height/2))
    order[i] = i;
    cities[i] = v;
  }
  precalculateDistances();
  createPopulation(order);
  allPermutationsSetup(order);
  nearestNeighbourSetup();
  calcMinDistanceLevel();
}

function arrayMin(arr) {
  var len = arr.length, min = Infinity;
  while (len--) {
    if (arr[len] < min) {
      min = arr[len];
    }
  }
  return min;
};


function calcMinDistanceLevel(){
  for(let i = 0; i<size; i++){
    let minValue = Infinity;
    for(let j = 0; j<size; j++)if(i != j){
      if(distances[i][j] < minValue) minValue = distances[i][j];
    }
    minimumDistance += minValue;
  }
}

function draw() {
  background(0);
  fill(255);
  for(var i = 0; i < size; i++){
    ellipse(cities[i].x, cities[i].y, 5, 5);
  }
  //allPermutations();
  //geneticAlgo();
  //nearestNeighbourDraw();
  comparison();
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

function calcDistance(points, order) {
  var sum = 0;
  for (var i = 0; i < order.length; i++) {
      var cityAIndex = order[i];
      var cityBIndex = order[(i + 1)%order.length];
      var d = distances[cityAIndex][cityBIndex];
      sum += d;
  }
  return sum;
}

function comparison(){
  geneticAlgo();
  allPermutations();
  nearestNeighbourDraw();
  showDistances();
}

function factorial(n){
  let fact = 1;
  for(let i = 2; i<=n; i++){
    fact *= i;
  }
  return fact;
}

function showDistances(){
  let translation = 11/20;
  translate(width*translation,height*translation);
  textSize(32);
  fill(255);
  let currentBests = "Distances\nLower Bound = " + minimumDistance.toFixed(3) + "\nGA = " + bestDistanceGA.toFixed(3) + "\nNearest Neighbour = " + bestDistanceNearestNeighbour.toFixed(3) + "\nAll permutations = " + bestDistancePermutations.toFixed(3);
  text(currentBests, 0, 0);
  translate(-width*translation, -height*translation);
}
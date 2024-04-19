var popSize = 500;
var population = [];
var fitness = [];
var currentBest = [];

var statusP;

function createPopulation(order){
    for (var i = 0; i < popSize; i++) {
        population[i] = shuffle(order);
    }
    statusP = createP('').style('font-size', '32pt');
}

function geneticAlgo(){
    // GA
    calculateFitness();
    normalizeFitness();
    nextGeneration();

    stroke(128,0,128);
    strokeWeight(2);
    noFill();
    beginShape();
    for (var i = 0; i < bestEver.length; i++) {
        var n = bestEver[i];
        vertex(cities[n].x, cities[n].y);
        ellipse(cities[n].x, cities[n].y, 4, 4);
    }
    //line(cities[bestEver[size-1]].x, cities[bestEver[size-1]].y, cities[bestEver[0]].x, cities[bestEver[0]].y)
    endShape();

    translate(0, height / 2);
    stroke(255);
    strokeWeight(2);
    noFill();
    beginShape();
    for (var i = 0; i < currentBest.length; i++) {
        var n = currentBest[i];
        vertex(cities[n].x, cities[n].y);
        ellipse(cities[n].x, cities[n].y, 4, 4);
    }
    endShape();
}

function calculateFitness() {
    var currentRecord = Infinity;
    for (var i = 0; i < population.length; i++) {
        var d = calcDistance(cities, population[i]);
        if (d < bestDistance) {
        bestDistance = d;
        bestEver = population[i];
        }
        if (d < currentRecord) {
        currentRecord = d;
        currentBest = population[i];
        }

        // This fitness function has been edited from the original video
        // to improve performance, as discussed in The Nature of Code 9.6 video,
        // available here: https://www.youtube.com/watch?v=HzaLIO9dLbA
        fitness[i] = 1 / (pow(d, 8) + 1);
    }
}
  
function normalizeFitness() {
    var sum = 0;
    for (var i = 0; i < fitness.length; i++) {
        sum += fitness[i];
    }
    for (var i = 0; i < fitness.length; i++) {
        fitness[i] = fitness[i] / sum;
    }
}

function nextGeneration() {
    var newPopulation = [];
    for (var i = 0; i < population.length; i++) {
        var orderA = pickOne(population, fitness);
        var orderB = pickOne(population, fitness);
        var order = crossOver(orderA, orderB);
        mutate(order, 0.01);
        newPopulation[i] = order;
    }
    population = newPopulation;
}

function pickOne(list, prob) {
    var index = 0;
    var r = random(1);

    while (r > 0) {
        r = r - prob[index];
        index++;
    }
    index--;
    return list[index].slice();
}
  
function crossOver(orderA, orderB) {
    var start = floor(random(orderA.length));
    var end = floor(random(start + 1, orderA.length));
    var neworder = orderA.slice(start, end);
    // var left = size - neworder.length;
    for (var i = 0; i < orderB.length; i++) {
        var city = orderB[i];
        if (!neworder.includes(city)) {
        neworder.push(city);
        }
    }
    return neworder;
}

function mutate(order, mutationRate) {
    for (var i = 0; i < size; i++) {
        if (random(1) < mutationRate) {
        var indexA = floor(random(order.length));
        var indexB = (indexA + 1) % size;
        swap(order, indexA, indexB);
        }
    }
}

function calcDistance(points, order) {
    var sum = 0;
    for (var i = 0; i < order.length-1; i++) {
        var cityAIndex = order[i];
        var cityBIndex = order[i + 1];
        var d = distances[cityAIndex][cityBIndex];
        sum += d;
    }
    return sum;
}

function swap(a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}
function createPopulation(order){
    for (let i = 0; i < popSize; i++) {
        population[i] = shuffle(order, false  );
    }
    bestEver = order.slice();
}

function geneticAlgo(){
    // GA
    calculateFitness();
    normalizeFitness();
    nextGeneration();

    translate(0, 0);
    stroke(128,0,128);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < bestEver.length; i++) {
        let n = bestEver[i];
        vertex(cities[n].x, cities[n].y);
        ellipse(cities[n].x, cities[n].y, 4, 4);
    }
    line(cities[bestEver[size-1]].x, cities[bestEver[size-1]].y, cities[bestEver[0]].x, cities[bestEver[0]].y)
    endShape();

    stroke(255);
    strokeWeight(.5);
    noFill();
    beginShape();
    for (let i = 0; i < currentBest.length; i++) {
        let n = currentBest[i];
        vertex(cities[n].x, cities[n].y);
        ellipse(cities[n].x, cities[n].y, 4, 4);
    }
    endShape();
}

function calculateFitness() {
    let currentRecord = Infinity;
    for (let i = 0; i < population.length; i++) {
        let d = calcDistance(cities, population[i]);
        if (d < bestDistanceGA) {
            bestDistanceGA = d;
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
    let sum = 0;
    for (let i = 0; i < fitness.length; i++) {
        sum += fitness[i];
    }
    for (let i = 0; i < fitness.length; i++) {
        fitness[i] = fitness[i] / sum;
    }
}

function nextGeneration() {
    let newPopulation = [];
    for (let i = 0; i < population.length; i++) {
        let orderA = pickOne(population, fitness);
        let orderB = pickOne(population, fitness);
        let order = crossOver(orderA, orderB);
        mutate(order, 0.01);
        newPopulation[i] = order;
    }
    population = newPopulation;
}

function pickOne(list, prob) {
    let index = 0;
    let r = random(1);

    while (r > 0) {
        r = r - prob[index];
        index++;
    }
    index--;
    return list[index].slice();
}
  
function crossOver(orderA, orderB) {
    let start = floor(random(orderA.length));
    let end = floor(random(start + 1, orderA.length));
    let neworder = orderA.slice(start, end);
    // let left = size - neworder.length;
    for (let i = 0; i < orderB.length; i++) {
        let city = orderB[i];
        if (!neworder.includes(city)) {
        neworder.push(city);
        }
    }
    return neworder;
}

function mutate(order, mutationRate) {
    for (let i = 0; i < size; i++) {
        if (random(1) < mutationRate) {
        let indexA = floor(random(order.length));
        let indexB = (indexA + 1) % size;
        swap(order, indexA, indexB);
        }
    }
}

function swap(a, i, j) {
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}
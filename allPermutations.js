function allPermutationsSetup(order){
    orderPermutations = order.slice();
}

function allPermutations(){
    iterations++;
    let dist = calcDistance(cities, orderPermutations);
    if(bestDistancePermutations > dist){
      bestDistancePermutations = dist;
      bestorderPermutations = orderPermutations.slice();
    }
    
    translate(0, height/2);
    stroke(128,0,128);
    strokeWeight(3);
    noFill();
    beginShape();
    for(let i = 0; i < size; i++){
        let n = bestorderPermutations[i];
        vertex(cities[n].x, cities[n].y);
        ellipse(cities[n].x, cities[n].y, 4, 4);
    }
    line(cities[bestorderPermutations[size-1]].x, cities[bestorderPermutations[size-1]].y, cities[bestorderPermutations[0]].x, cities[bestorderPermutations[0]].y)
    endShape();

    
    /*
    stroke(255);
    strokeWeight(.5);
    noFill();
    beginShape();
    for(let i = 0; i < size; i++){        
        let n = orderPermutations[i];
        vertex(cities[n].x, cities[n].y);
        ellipse(cities[n].x, cities[n].y, 4, 4);
    }
    line(cities[orderPermutations[size-1]].x, cities[orderPermutations[size-1]].y, cities[orderPermutations[0]].x, cities[orderPermutations[0]].y)
    endShape();
    */
    translate(0, -height/2);

    //showPercentage();
    
    orderPermutations = nextPermutation(orderPermutations);
    if(orderPermutations == null) noLoop();
}


function showPercentage(){
    let percentageTried = ((iterations/fact)*100).toFixed(3);
    textSize(32);
    fill(255);
    text(percentageTried, 20, height*20/21);
}

function nextPermutation(array) {
    // Find the largest index k such that a[k] < a[k + 1]
    let k = array.length - 2;
    while (k >= 0 && array[k] >= array[k + 1]) {
        k--;
    }
    // If no such index exists, this is the last permutation
    if (k === -1) {
        return null;
    }
    // Find the largest index l greater than k such that a[k] < a[l]
    let l = array.length - 1;
    while (array[k] >= array[l]) {
        l--;
    }
    // Swap a[k] with a[l]
    [array[k], array[l]] = [array[l], array[k]];
    // Reverse the sequence from a[k + 1] up to and including the final element
    let start = k + 1;
    let end = array.length - 1;
    while (start < end) {
        [array[start], array[end]] = [array[end], array[start]];
        start++;
        end--;
    }
    return array;
}
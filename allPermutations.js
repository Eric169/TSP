var order = [];
var bestOrder = [];
var iterations = 0;

function allPermutations(){
    iterations++;
    stroke(255);
    strokeWeight(.5);
    noFill();
    beginShape();
    for(var i = 0; i < size; i++){
      vertex(cities[order[i]].x, cities[order[i]].y);
    }
    endShape();
  
    var dist = distance();
    if(bestDistance > dist){
      bestDistance = dist;
      bestOrder = order.slice();
    }
  
    stroke(128,0,128);
    strokeWeight(3);
    noFill();
    beginShape();
    for(var i = 0; i < size; i++){
      vertex(cities[bestOrder[i]].x, cities[bestOrder[i]].y);
    }
    endShape();
  
    showPercentage();
  
    order = nextPermutation(order);
    if(order == null) noLoop();
}


function showPercentage(){
    var percentageTried = ((iterations/factorial(size))*100).toFixed(3);
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
function nearestNeighbourSetup(){
    nearestNeighbourPath();
}

function nearestNeighbourDraw(){
    translate(width/2, 0);
    stroke(128,0,128);
    strokeWeight(3);
    noFill();
    beginShape();
    for(var i = 0; i < size; i++){
        var n = bestOrder[i];
        vertex(cities[n].x, cities[n].y);
        ellipse(cities[n].x, cities[n].y, 4, 4);
    }
    line(cities[bestOrder[size-1]].x, cities[bestOrder[size-1]].y, cities[bestOrder[0]].x, cities[bestOrder[0]].y)
    endShape();
    translate(-width/2, 0);
}

// tour of points using nearest neighbor heuristic
function nearestNeighbourPath() {
    for(let i = 0; i < size; i++){
        let path = [i];
        let current = i;
        while(path.length < size){              
            let nearestDistance = height * height + width * width + 1;
            let nearestPoint = null;
            for (let k = 0; k < cities.length; k++) if(!path.includes(k)){
                let dist = distances[current][k];
                if(dist < nearestDistance){
                    nearestDistance = dist;
                    nearestPoint = k;
                }
            }
            path[path.length] = nearestPoint;
            current = nearestPoint;
        }
        let currDistance = calcDistance(cities, path);
        if(currDistance < bestDistanceNearestNeighbour){
            bestOrder = path.slice();
            bestDistanceNearestNeighbour = currDistance;
        }
    }
}
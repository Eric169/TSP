// tour of points using nearest neighbor heuristic
function nearestNeighbour(current) {
    var remaining = generateRandomPath();
    path = [remaining[0]];
    paths.push(path.slice(0));

    for (var i = 0; i < points.length - 1; i++) {
        var nearestDistance = height * height + width * width + 1;
        var nearestPoint = null;
        var indexInRemaining = 0;

        // find nearest neighbor
        for (var j = i + 1; j < points.length; j++) {
            currentDistance = distances[path[i]][remaining[j]];
            if (currentDistance < nearestDistance) {
                nearestPoint = remaining[j];
                nearestDistance = currentDistance;
                indexInRemaining = j;
            }
        }
        // add to path and swap in remaining so it will not be added again
        remaining = swap(remaining, i + 1, indexInRemaining);
        path.push(remaining[i + 1]);
        if (isAnimate) {
            paths.push(path.slice(0));
            insertions.push({
                i: i + 1, 
                before: points[remaining[i]], 
                insert: points[remaining[i + 1]], 
                after: null
            });
        }
    }
    if (!isAnimate) {
        paths = [path];
    }
    pathDistances.push(getPathDistance(path));
};
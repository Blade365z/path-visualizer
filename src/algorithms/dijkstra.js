//Dijkstra's Algorithm


//visited  - Array; Keeping track of all the visisted vertex
//weights - HashMap; Keeping track of the weights 
//parentMap -Hashmap; Keeping track of the parents
//Functions to be implmeneted
//calulateShortest()
//Dijkstras()

const Dijkstra = (graph, source, destination) => {
    var visited = {};
    var weights = {};
    var parentMap = {};
    //Initalization
    let startNode = source;
    let finishNode = destination;
    Object.keys(graph).map(node => weights[node] = Infinity)
    Object.keys(graph).map(node => parentMap[node] = null)
    let selectedNode = startNode;
    let startNeighbours = graph[selectedNode];
    weights[selectedNode] = 0;
    Object.keys(startNeighbours).forEach(node => {
        parentMap[node] = selectedNode
    })
    //Analysing all nodes and computing the cost
    let graphLength = Object.keys(graph).length
    for (let i = 0; i < graphLength; i++) {
        visited[selectedNode] = true;
        let neighbours = graph[selectedNode];
        if (neighbours) {
            let min = calulateShortest(neighbours, selectedNode);
            selectedNode = min.node;
        }
        if (selectedNode === finishNode) {
            break;
        }
    }

    // //Backtrack
    // //Validating if the destination is reachable or not.
    let parent = parentMap[finishNode];
    if (parent) {
        let path = [finishNode];
        let totalCost = weights[finishNode];
        while (parent) {
            path.push(parent);
            totalCost += weights[parent];
            parent = parentMap[parent];
        }
        //Printing the results
        return {
            path: path.reverse(),
            cost: totalCost,
            visited: visited
        }
    }
    else {
        return 'Destination node unreachable!'
    }
    function calulateShortest(neigh, selectedNode) {
        Object.keys(neigh).forEach(neighbour => {
            if (weights[neighbour]) {
                let currentWeight = weights[neighbour];
                let parent = selectedNode;
                let child = neighbour;
                let totalWeight = 0;
                while (parent !== null) {
                    totalWeight += graph[parent][child]
                    child = parent;
                    parent = parentMap[parent]
                }
                // Relaxation
                if (totalWeight < currentWeight) {
                    weights[neighbour] = totalWeight;
                    parentMap[neighbour] = selectedNode;
                }

            }
        })
        //Find the minimum weighted node in the current context
        var min = {
            node: null,
            cost: Infinity
        };

        Object.keys(weights).forEach(node => {
            if (weights[node] < min.cost && !visited[node]) {
                min.cost = weights[node];
                min.node = node
            }
        });
        return min;
    }

}


export default Dijkstra;
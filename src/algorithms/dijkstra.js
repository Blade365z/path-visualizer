//Dijkstra's Algorithm


//visited  - Array; Keeping track of all the visisted vertex
//weights - HashMap; Keeping track of the weights 
//parentMap -Hashmap; Keeping track of the parents
//Functions to be implmeneted
//calulateShortest()
//Dijkstras()



var visited = [];
var weights = {};
var parentMap = {};
var graph = {};
function calulateShortest(neigh, selectedNode) {
    Object.keys(neigh).map(neighbour => {
        if (weights[neighbour]) {
            let currentWeight = weights[neighbour];
            let parent = selectedNode;
            let totalWeight = 0;
            while (parent) {
                let tempNeigh = graph[parent];
                totalWeight += tempNeigh[neighbour];
                parent = parentMap[tempNeigh];
            }
            //Relaxation
            if (totalWeight < currentWeight) {
                weights[neighbour] = totalWeight;
                parentMap[neighbour] = selectedNode;
                parent = parentMap[parent];
            }
        }
    })
    //Find the minimum weighted node in the current context
    var min = {
        node: null,
        cost: Infinity
    };
    Object.keys(weights).map(node => {
        if (weights[node] < min.cost && !visited.includes(node)) {
            min.cost = weights[node];
            min.node = node
        }
    });
    return min;
}

const Dijkstra = (data) => {
    graph = data;
    //Initalization
    let startNode = "5";
    let finishNode = "13";
    Object.keys(graph).map(node => weights[node] = Infinity)
    Object.keys(graph).map(node => parentMap[node] = null)
    let selectedNode = startNode;
    let startNeighbours = graph[selectedNode];
    weights[selectedNode] = 0;
    Object.keys(startNeighbours).map(node => {
        parentMap[node] = selectedNode
    })
    //Analysing all nodes and computing the cost
    Object.keys(graph).forEach(node => {
        if (!visited.includes(selectedNode))
            visited.push(selectedNode)
        let neighbours = graph[selectedNode];
        if (neighbours) {
            let min = calulateShortest(neighbours, selectedNode);
            selectedNode = min.node;
        }
    })
    //Backtrack
    //Validating if the destination is reachable or not.
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
            cost: totalCost
        }
    }
    else {
        return 'Destination node unreachable!'
    }
}


export default Dijkstra;
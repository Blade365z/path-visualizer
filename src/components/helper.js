//Debounce
export const debounce = (func, wait) => {
    let timer;
    return function (...args) {
        const context = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null
            func.apply(context, args);
        }, wait);
    }
}


export const wrapperGraph = (graphData, row, col) => {
    let adjacencyList = {}
    let source, destination = null;
    Object.keys(graphData).map(key => {
        graphData[key] === 'SOURCE' ? source = key : graphData[key] === 'DESTINATION' ? destination = key : destination = destination;
        adjacencyList[key] = {};
        let neighbours = [];
        parseInt(key) + col < row * col && neighbours.push(parseInt(key) + col)
        parseInt(key) - col > 0 && neighbours.push(parseInt(key) - col)
        parseInt(key) + 1 < row * col && neighbours.push(parseInt(key) + 1)
        parseInt(key) - 1 > 0 && neighbours.push(parseInt(key) - 1)
        neighbours.forEach(node => {
            if (graphData[node] !== 'OBSTACLE') {
                adjacencyList[key][node] = 1;
            }
        })
    });
    return {
        adjacencyList: adjacencyList,
        source: source,
        destination: destination
    }
}



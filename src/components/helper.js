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
    let i = 0, START, END, base = 0;
    Object.keys(graphData).forEach(key => {
        if (i % (col) === 0) {
            START = base * (col);
            END = (START + col) - 1
            base += 1;
        }
        graphData[key] === 'SOURCE' ? source = key : graphData[key] === 'DESTINATION' ? destination = key : destination = destination;
        adjacencyList[key] = {};
        let neighbours = [];
        parseInt(key) + col < row * col && neighbours.push(parseInt(key) + col)
        parseInt(key) - col > 0 && neighbours.push(parseInt(key) - col)
        parseInt(key) + 1 <= END && parseInt(key) + 1 < row * col && neighbours.push(parseInt(key) + 1)
        parseInt(key) - 1 >= START && parseInt(key) - 1 >= 0 && neighbours.push(parseInt(key) - 1)
        console.log(key, END, parseInt(key) + 1)
        neighbours.forEach(node => {
            if (graphData[node] !== 'OBSTACLE') {
                adjacencyList[key][node] = 1;
            }
        })
        i += 1;
    });
    console.log(adjacencyList)
    return {
        adjacencyList: adjacencyList,
        source: source,
        destination: destination
    }
}



import React, { useState, useEffect, useRef } from 'react'

import Grid from './Grid';
import { wrapperGraph } from './helper';
import './App.css';


import Dijkstra from '../algorithms/dijkstra';
const graph = {
    row: 20,
    col: 50,
    source: 'SOURCE',
    destination: 'DESTINATION',
    obstacles: 'OBSTACLE',
    road: 'ROAD',
}
function initialzeObjectForGrid(row, col, source, destination) {
    let object = {};
    for (let i = 0; i < (row * col); i++) {
        if (i === source)
            object[i] = graph.source;
        else if (i === destination)
            object[i] = graph.destination
        else
            object[i] = graph.road
    }
    return object;
}
const App = () => {
    const [GridData, setGridData] = useState([]);
    const SourceNode = useRef(436);
    const DestinationNode = useRef(440);
    const [Visited, setVisited] = useState({});
    const [Path, setPath] = useState({});
    useEffect(() => {
        setGridData(initialzeObjectForGrid(graph.row, graph.col, SourceNode.current, DestinationNode.current))
    }, [])


    const setUpObstacles = (node, type) => {
        setGridData(prevState => ({
            ...prevState,
            [node]: type
        }))
    }

    const setDraggedNode = (from, to, changed) => {
        let typeTemp = GridData[from];
        if (changed === graph.source) {
            SourceNode.current = parseInt(to);
        } else {
            DestinationNode.current = parseInt(to);
        }
        const newGrid = initialzeObjectForGrid(graph.row, graph.col, SourceNode.current, DestinationNode.current);
        setGridData(newGrid)
    }

    const findPath = async () => {
        const processedGraph = wrapperGraph(GridData, graph.row, graph.col);
        const dijkstra = Dijkstra(processedGraph.adjacencyList, processedGraph.source, processedGraph.destination);
        let i = 0;
        function plotVisited() {
            let visitedCount = 0;
            dijkstra.visited.forEach(node => {
                setTimeout(() => {
                    setVisited(prevState => ({
                        ...prevState,
                        [node]: true
                    }))
                    visitedCount += 1;
                    if (visitedCount === dijkstra.visited.length) {
                        setTimeout(plotPath, 1000);
                    }
                }, 100)

            });
        }
        function plotPath() {
            let delay = 0;
            dijkstra.path.forEach(node => {
                setTimeout(() => {
                    setPath(prevState => ({
                        ...prevState,
                        [node]: true
                    }))
                }, 90 * delay)
                delay += 0.01;

            })


        }
        plotVisited();

    }

    return (
        <div>
            <div className="nav">
                <div><h1 style={{ margin: '0' }}>Path Visualizer</h1></div>
                <div style={{ marginLeft: 'auto', paddingTop: '10px' }}>
                    <select className="drop-down">
                        <option>Dijkstra's Algorithm</option>
                        <option>A* Algorithm</option>
                    </select>
                    <button className="button" onClick={() => findPath()}>Search Path</button>
                    <button className="button">Reset Grid   </button>
                    <button className="button">Set up maze</button>
                </div>
            </div>
            <div className="grid-container">
                <Grid
                    GridData={GridData}
                    setUpObstacles={setUpObstacles}
                    setDraggedNode={setDraggedNode}
                    sourceNode={SourceNode.current}
                    destinationNode={DestinationNode.current}
                    visitedNodes={Visited}
                    pathNodes={Path}
                />
            </div>
        </div>
    )
}

export default App;


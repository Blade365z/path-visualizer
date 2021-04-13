import React, { useState, useCallback } from 'react'

import Grid from './Grid';
import { wrapperGraph } from './helper';
import './App.css';


import Dijkstra from '../algorithms/dijkstra';
const graph = {
    row: 20,
    col: 50,
    defaultSource: 209,
    defaultDestination: 418,
    source: 'SOURCE',
    destination: 'DESTINATION',
    obstacles: 'OBSTACLE',
    path: 'PATH',
}
function initialzeObjectForGrid(row, col) {
    let object = {};
    let source = graph.defaultSource; //defaut Source
    let destination = graph.defaultDestination; //default Destination
    for (let i = 0; i < (row * col); i++) {
        if (i === source)
            object[i] = graph.source;
        else if (i === destination)
            object[i] = graph.destination
        else
            object[i] = graph.path
    }
    return object;
}
const App = () => {
    const [GridData, setGridData] = useState(
        initialzeObjectForGrid(graph.row, graph.col)
    );
    const [ShortestPath, setShortestPath] = useState({});
    const [VisitedNodes, setVistedNodes] = useState({});




    const setUpObstacles = useCallback((node, type) => {
        setGridData(prevState => ({
            ...prevState,
            [node]: type
        }))
    })

    const setDraggedNode = (source, target) => {
        let typeTemp = GridData[source];
        setGridData(prevState => {
            return ({
                ...prevState,
                [target]: typeTemp,
                [source]: graph.path,
            })
        });
    }

    const findPath = async () => {
        const processedGraph = wrapperGraph(GridData, graph.row, graph.col);
        const path = await Dijkstra(processedGraph.adjacencyList, processedGraph.source, processedGraph.destination);
        console.log(path)
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

                </div>
            </div>
            <div className="grid-container">
                <Grid
                    GridData={GridData}
                    setUpObstacles={setUpObstacles}
                    setDraggedNode={setDraggedNode}
                />
            </div>
        </div>
    )
}

export default App;


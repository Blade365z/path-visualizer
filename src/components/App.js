import React, { useState, useCallback } from 'react'

import Grid from './Grid';
import { wrapperGraph } from './helper';
import './App.css';


import Dijkstra from '../algorithms/dijkstra';

const initialzeObjectForGrid = (row, col) => {
    //Grid Object Initalizer
    /*
        {
            Node-Number:Type
        }
    */
    let object = {};
    let source = 5;
    let destination = 13;
    for (let i = 0; i < (row * col); i++) {
        if (i === source)
            object[i] = 'SOURCE';
        else if (i === destination)
            object[i] = 'DESTINATION'
        else
            object[i] = 'PATH'
    }
    return object;
}
const App = () => {
    const [GridData, setGridData] = useState(
        initialzeObjectForGrid(5, 5)
    );
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
                [source]: 'PATH',
            })
        });
    }

    const findPath = async () => {
        const processedGraph = wrapperGraph(GridData, 5, 5);
        const path = await Dijkstra(processedGraph);
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


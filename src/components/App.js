import React, { useState, useCallback } from 'react'

import Grid from './Grid';

import './App.css';


const initialzeObjectForGrid = (row, col) => {
    //Grid Object Initalizer
    /*
        {
            Node-Number:Type
        }
    */
    let object = {};
    let source = 458;
    let destination = 477;
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
        initialzeObjectForGrid(20, 50)
    );
    const setUpObstacles = useCallback((node, type) => {
        setGridData(prevState => ({
            ...prevState,
            [node]: type
        }))
    })

    const setDraggedNode = (source, target) => {
        let typeTemp = GridData[source];
        setGridData(prevState => ({
            ...prevState,
            [target]: typeTemp,
            [source]: 'PATH',
        }));
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
                    <button className="button">Search Path</button>
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


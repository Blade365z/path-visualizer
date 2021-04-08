import React, { useState } from 'react'
import Node from './Node'

import './App.css';


const App = () => {
    const [InputMode, setInputMode] = useState('SOURCE');
    //SOURCE, DESTINATION, OBSTACLES
    const [GridData,setGridData] = useState({
        source:null,
        destination:null,
        obstacles:{}
    })
    const generateGrid = () => {
        const Grid = [];
        for (let i = 0; i < 1500; i++)
            Grid.push(<Node number={i} key={i} />);
        return Grid;
    }
    return (
        <div>
            <h2 style={{ textAlign: 'center', margin: '0px' }}>Path Visualizer</h2>
            <div className="grid-container">
                <div className="grid">
                    {generateGrid()}
                </div>
            </div>
        </div>
    )
}

export default App;


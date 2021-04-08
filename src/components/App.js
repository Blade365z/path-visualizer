import React, { useState, useCallback } from 'react'

import Grid from './Grid';

import './App.css';


const App = () => {
    return (
        <div>
            <h2 style={{ textAlign: 'center', margin: '0px' }}>Path Visualizer</h2>
            <div className="grid-container">
                <Grid />
            </div>
        </div>
    )
}

export default App;


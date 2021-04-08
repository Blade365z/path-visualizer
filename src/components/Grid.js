import React, { useState } from 'react'


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


//Grid Component
const Grid = () => {
    const [GridData, setGridData] = useState(
        initialzeObjectForGrid(30, 50)
    );
    const [MouseHold, setMouseHold] = useState(false);
    const setObstacle = (node) => {
        if (MouseHold && GridData[node] !== 'SOURCE' && GridData[node] !== 'DESTINATION') {
            let gridData = {};
            Object.keys(GridData).map(element => {
                if (element === node) {
                    gridData[element] = 'OBSTACLE';

                } else {
                    gridData[element] = GridData[element];
                }
            })
            setGridData(gridData);
        }
    }

    return (
        <div className="grid" onMouseDown={() => setMouseHold(true)} onMouseUp={() => setMouseHold(false)} >
            {
                Object.keys(GridData).map((node, i) => {
                    return <div className={"node " + GridData[node].toLowerCase()} key={i} title={"node: " + node} onMouseOver={() => setObstacle(node)}>
                        {GridData[node] === 'SOURCE' && <i className="fas fa-male" draggable></i>}
                        {GridData[node] === 'DESTINATION' && <i className="fas fa-map-marker-alt "></i>}
                    </div>
                })
            }
        </div>
    )
}


export default Grid;

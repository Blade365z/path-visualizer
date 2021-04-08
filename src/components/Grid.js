import React, { useState } from 'react'
import Node from './Node'


const initialzeObjectForGrid = (row, col) => {
    let object = {};
    let source = 629;
    let destination = 655;
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
const Grid = () => {
    const [GridData, setGridData] = useState(
        initialzeObjectForGrid(30, 50)
    )


    return (
        <div className="grid">
            {
                Object.keys(GridData).map(node => {
                    return <Node key={node} />
                })
            }
        </div>
    )
}


export default Grid;

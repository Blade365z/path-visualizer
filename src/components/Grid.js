import React, { useState, useEffect, useRef } from 'react'




//Grid Component
const Grid = ({ GridData, setUpObstacles, setDraggedNode, sourceNode, destinationNode, visitedNodes }) => {

    const [MouseHold, setMouseHold] = useState(false);
    const setObstacle = (node) => {
        if (MouseHold && GridData[node] !== 'SOURCE' && GridData[node] !== 'DESTINATION') {
            (GridData[node] === 'OBSTACLE') && setUpObstacles(node, 'ROAD');
            (GridData[node] === 'ROAD') && setUpObstacles(node, 'OBSTACLE');
        }
    }
    const initiateObstacleSetup = (node) => {
        setMouseHold(true)
        if (GridData[node] !== 'SOURCE' && GridData[node] !== 'DESTINATION') {
            (GridData[node] === 'OBSTACLE') && setUpObstacles(node, 'ROAD');
            (GridData[node] === 'ROAD') && setUpObstacles(node, 'OBSTACLE');
        }
    }
    const dragNode = (e, node) => {
        //Make sure mouse hold is false
        setMouseHold(false);
        e.dataTransfer.setData('from', node);
    }
    const draggedOver = (e, node) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }
    const droppedOnGrid = (e, to) => {
        let from = e.dataTransfer.getData('from');
        from = parseInt(from)
        let changed = from === sourceNode ? 'SOURCE' : 'DESTINATION'
        if (from)
            if (GridData[to] !== 'SOURCE' && GridData[to] !== 'DESTINATION' && GridData[to] !== 'OBSTACLE') {
                setDraggedNode(from, to, changed)
                setMouseHold(false);
            }

    }
    return (
        <div className="grid"  >
            {
                Object.keys(GridData).map((node, i) => {
                    return <div className={visitedNodes[node] ? `node visited ${GridData[node].toLowerCase()}` : `node  ${GridData[node].toLowerCase()}`} key={i} title={"node: " + node} onMouseEnter={() => setObstacle(node)} onMouseDown={() => initiateObstacleSetup(node)} onMouseUp={() => setMouseHold(false)}    >
                        {
                            GridData[node] === 'SOURCE' && <div
                                draggable onDragStart={(e) => dragNode(e, node)}>
                                <i className="fas fa-male" ></i>
                            </div>
                        }

                        {
                            GridData[node] === 'DESTINATION' && <div
                                draggable onDragStart={(e) => dragNode(e, node)}>
                                <i className="fas fa-map-marker-alt "></i>
                            </div>
                        }
                        {
                            GridData[node] === 'ROAD' && <div
                                onDragOver={(e) => draggedOver(e, node)}
                                onDrop={(e) => droppedOnGrid(e, node)}
                                style={{ width: '100%', height: '100%' }} >
                            </div>
                        }
                        {
                            GridData[node] === 'PATH' && <div
                                onDragOver={(e) => draggedOver(e, node)}
                                onDrop={(e) => droppedOnGrid(e, node)}
                                style={{ width: '100%', height: '100%' }} >
                                <i className="fas fa-map-marker-alt "></i>
                            </div>
                        }
                    </div>
                })
            }
        </div>
    )
}


export default Grid;

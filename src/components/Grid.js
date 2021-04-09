import React, { useState, useEffect, useRef } from 'react'




//Grid Component
const Grid = ({ GridData, setUpObstacles, setDraggedNode }) => {

    const [MouseHold, setMouseHold] = useState(false);
    const setObstacle = (node) => {
        if (MouseHold && GridData[node] !== 'SOURCE' && GridData[node] !== 'DESTINATION') {
            (GridData[node] === 'OBSTACLE') && setUpObstacles(node, 'PATH');
            (GridData[node] === 'PATH') && setUpObstacles(node, 'OBSTACLE');
        }
    }
    const initiateObstacleSetup = (node) => {
        setMouseHold(true)
        if (GridData[node] !== 'SOURCE' && GridData[node] !== 'DESTINATION') {
            (GridData[node] === 'OBSTACLE') && setUpObstacles(node, 'PATH');
            (GridData[node] === 'PATH') && setUpObstacles(node, 'OBSTACLE');
        }
    }
    const dragNode = (e, node) => {
        //Make sure mouse hold is false
        setMouseHold(false);
        e.dataTransfer.setData('source', node);
    }
    const draggedOver = (e, node) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }
    const droppedOnGrid = (e, node) => {
        let source = e.dataTransfer.getData('source');
        if (GridData[node] !== 'SOURCE' && GridData[node] !== 'DESTINATION' && GridData[node] !== 'OBSTACLE') {
            setDraggedNode(source, node);

        }
    }
    return (
        <div className="grid"  >
            {
                Object.keys(GridData).map((node, i) => {
                    return <div className={"node " + GridData[node].toLowerCase()} key={i} title={"node: " + node} onMouseEnter={() => setObstacle(node)} onMouseDown={() => initiateObstacleSetup(node)} onMouseUp={() => setMouseHold(false)}    >
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
                            GridData[node] === 'PATH' && <div
                                onDragOver={(e) => draggedOver(e, node)}
                                onDrop={(e) => droppedOnGrid(e, node)}
                                style={{ width: '100%', height: '100%' }} >
                            </div>
                        }
                    </div>
                })
            }
        </div>
    )
}


export default Grid;

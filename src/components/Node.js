import React from 'react'


const Node = ({ number, type, mouseHoldFlag, setObstacles }) => {
    const handleObstacleCreate = (node) => {
        if (mouseHoldFlag) {
            setObstacles(node)
        }
    }
    return (
        <div className={type === 'SOURCE' ? 'node source-node' : type === 'DESTINATION' ? 'node destination-node' : type === 'OBSTACLE' ? 'node obstacle-node' : 'node path-node'} title={"Node: " + number} onMouseOver={() => handleObstacleCreate(number)} >
            {
                type === 'SOURCE' && <i className="fas fa-male" draggable></i>
            }
            {
                type === 'DESTINATION' && <i className="fas fa-map-marker-alt "></i>
            }

        </div>
    )
}

export default Node;
import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';

const DrawingCanvas = () => {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const stageRef = useRef(null);

  // Create grid lines
  const createGrid = () => {
    const gridSize = 20;
    const width = 800;
    const height = 600;
    const gridLines = [];

    // Create vertical lines
    for (let i = 0; i <= width; i += gridSize) {
      gridLines.push({
        points: [i, 0, i, height],
        stroke: '#eeeeee',
        strokeWidth: 1,
        id: `v-${i}`,
      });
    }

    // Create horizontal lines
    for (let i = 0; i <= height; i += gridSize) {
      gridLines.push({
        points: [0, i, width, i],
        stroke: '#eeeeee',
        strokeWidth: 1,
        id: `h-${i}`,
      });
    }

    return gridLines;
  };

  const gridLines = createGrid();

  const handleMouseDown = (e) => {
    if (!isDrawingMode) return;
    
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { 
      points: [pos.x, pos.y, pos.x, pos.y],
      stroke: brushColor,
      strokeWidth: brushSize,
      lineCap: 'round',
      lineJoin: 'round',
      tension: 0.5,
      id: Date.now(),
    }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !isDrawingMode) return;
    
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    
    const lastLine = lines[lines.length - 1];
    // Add the new point to the last line's points array
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    
    // Replace the last line with the updated line
    setLines([...lines.slice(0, -1), lastLine]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Clear the canvas
  const clearCanvas = () => {
    setLines([]);
  };

  // Toggle drawing mode
  const toggleDrawingMode = () => {
    setIsDrawingMode(!isDrawingMode);
  };

  // Save canvas as image
  const saveCanvas = () => {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL();
      
      const link = document.createElement('a');
      link.href = uri;
      link.download = 'canvas-drawing.png';
      link.click();
    }
  };

  return (
    <div className="drawing-canvas-container">
      <div className="canvas-controls">
        <div className="control-group">
          <label htmlFor="brush-size">Brush Size:</label>
          <input
            id="brush-size"
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
          />
          <span>{brushSize}px</span>
        </div>
        
        <div className="control-group">
          <label htmlFor="brush-color">Color:</label>
          <input
            id="brush-color"
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
          />
        </div>
        
        <button onClick={toggleDrawingMode}>
          {isDrawingMode ? 'Selection Mode' : 'Drawing Mode'}
        </button>
        
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={saveCanvas}>Save</button>
      </div>
      
      <div className="canvas-wrapper">
        <Stage
          width={800}
          height={600}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onMouseLeave={handleMouseUp}
          ref={stageRef}
          style={{ backgroundColor: 'white', border: '1px solid #cccccc' }}
        >
          <Layer>
            {/* Grid lines */}
            {gridLines.map((line) => (
              <Line
                key={line.id}
                points={line.points}
                stroke={line.stroke}
                strokeWidth={line.strokeWidth}
              />
            ))}
            
            {/* Drawing lines */}
            {lines.map((line) => (
              <Line
                key={line.id}
                points={line.points}
                stroke={line.stroke}
                strokeWidth={line.strokeWidth}
                lineCap={line.lineCap}
                lineJoin={line.lineJoin}
                tension={line.tension}
              />
            ))}
          </Layer>
        </Stage>
      </div>
      
      <style jsx>{`
        .drawing-canvas-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }
        
        .canvas-controls {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          flex-wrap: wrap;
          align-items: center;
        }
        
        .control-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        button {
          padding: 8px 16px;
          background-color: #4a90e2;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }
        
        button:hover {
          background-color: #3a80d2;
        }
        
        .canvas-wrapper {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default DrawingCanvas;
import { useEffect, useRef, useState } from "react";
import { Cell } from "../models/Cell";
import { HuntAndKill } from "../models/algorithms/HuntAndKill";

function NewMaze(){
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const cellSize: number = 20; // length of cell edge
  const cellEdgeThickness: number = 2; // thickness of cell edge
  // const cellBackground : string= '#FFFFFF';
  // const solutionPathColor : String= '#FF7575';
  // const myPathColor : String= '#4080FF';
  // const myPathThickness : Number= 10;
  // const solutionPathThickness : Number = 3;
  
  const [dimensions, setDimensions] = useState({row: 10, col: 10});

  
  useEffect(() => {
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext('2d');
    }
    console.log(canvasRef);
    
    console.log("Here in the useEffect");
    
  },[canvasRef]);

  useEffect(()=>{
    console.log("Here in the useEffect");
    console.log(dimensions);
    handleClick();
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dimensions]);

  // method to draw each cell 
  function renderBorders(cell: Cell): void {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = '#000';
    }
    if (ctxRef.current) {
      ctxRef.current.lineWidth = cellEdgeThickness;
    }
    if (ctxRef.current) {
      if (cell.northEdge) {
        if(cell.row === 0) ctxRef.current.lineWidth = 4;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(cell.col * cellSize, cell.row * cellSize);
        ctxRef.current.lineTo((cell.col + 1) * cellSize, cell.row * cellSize);
        ctxRef.current.stroke();
        ctxRef.current.lineWidth = cellEdgeThickness;
      }
      if (cell.eastEdge) {
        if(cell.col === dimensions.col - 1) ctxRef.current.lineWidth = 4;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo((cell.col + 1) * cellSize, cell.row * cellSize);
        ctxRef.current.lineTo(
          (cell.col + 1) * cellSize,
          (cell.row + 1) * cellSize
          );
          ctxRef.current.stroke();
        ctxRef.current.lineWidth = cellEdgeThickness;
      }
      if (cell.southEdge) {
        if(cell.row === dimensions.row - 1) ctxRef.current.lineWidth = 4;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(
          (cell.col + 1) * cellSize,
          (cell.row + 1) * cellSize
        );
        ctxRef.current.lineTo(cell.col * cellSize, (cell.row + 1) * cellSize);
        ctxRef.current.stroke();
        ctxRef.current.lineWidth = cellEdgeThickness;
      }
      if (cell.westEdge) {
        if(cell.col === 0) ctxRef.current.lineWidth = 4;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(cell.col * cellSize, (cell.row + 1) * cellSize);
        ctxRef.current.lineTo(cell.col * cellSize, cell.row * cellSize);
        ctxRef.current.stroke();
        ctxRef.current.lineWidth = cellEdgeThickness;
      }
    }

  }

  function handleClick() {
    // const rowInput = document.getElementById('row');
    // const colInput = document.getElementById('col');
    // setDimensions({
    //   row: parseInt((rowInput as HTMLInputElement)?.value || '1'),
    //   col: parseInt((colInput as HTMLInputElement)?.value || '1')
    // });
    console.log(dimensions);
    
    if(dimensions.row < 1 || dimensions.col < 1){
      alert("Please enter a valid row and column");
      return;
    }

    if(dimensions.row > 100 || dimensions.col > 100){
      alert("Please enter a row and column less than 100");
      return;
    }

    const maze : HuntAndKill = new HuntAndKill(dimensions.row,dimensions.col);
    console.log("maze has been generated");
    
    if (canvasRef.current) {
      canvasRef.current.width = dimensions.col * cellSize;
    }
    if (canvasRef.current) {
      canvasRef.current.height = dimensions.row * cellSize;
    }
    if (ctxRef.current) {
      ctxRef.current.lineWidth = cellEdgeThickness;
    }
    // maze.cells.forEach(x => x.forEach(c =>{ draw(c); console.log(c);}));
    if (ctxRef.current) {
      ctxRef.current.clearRect(0, 0, dimensions.row * cellSize, dimensions.col * cellSize);
      maze.cells.forEach(x => x.forEach(c => {
        if (ctxRef.current) {
          ctxRef.current.fillStyle = '#ccc';
        }
        if (ctxRef.current) {
          ctxRef.current.fillRect(c.col * cellSize, c.row * cellSize, cellSize, cellSize);
        }
      }));
      maze.firstCell(maze.cells[0][0]);
      maze.lastCell(maze.cells[dimensions.row - 1][dimensions.col - 1]);
      maze.cells.forEach(x => x.forEach(c => renderBorders(c)));
    }
    else console.log("ctxRef is possible null");

    console.log("Maze should have been generated ");
    
  }

  return(
    <>
      <canvas ref={canvasRef} height={500} width={500} id="Maze"/>
      <br />
      <input type="number" id="row" placeholder="row" />
      <input type="number" id="col" placeholder="col" />
      <button onClick={()=>{
        setDimensions({
          // row: parseInt((document.getElementById('row') as HTMLInputElement)?.value || '1'),
          // col: parseInt((document.getElementById('col') as HTMLInputElement)?.value || '1')
          row: parseInt((document.getElementById('row') as HTMLInputElement)?.value || '1'),
          col: parseInt((document.getElementById('col') as HTMLInputElement)?.value || '1')
        });
        // handleClick();
      }}>Generate new Maze</button>
    </>
  )
}

export default NewMaze;
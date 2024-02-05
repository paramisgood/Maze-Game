import { useRef } from "react";


const MazeBoard = (props : any) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  
  
  // add
  
  return <>
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  </>
}

export default MazeBoard;
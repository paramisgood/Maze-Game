import { useState } from "react";
import MazeBoard from "./MazeBoard/MazeBoard";

const Algorithm = [
  {value: 1, label : 'Hunt and Kill'},
  {value: 2, label : 'Recursive Backtracker'}
];

const MazeGame = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGamePlaying, setIsGamePlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(Algorithm[0]);
  const [isJustStarted , setIsJustStarted] = useState(true);

  //is game playing ==false -> pauesd if -> justStarted == false and isGameOver == false 
  return <>
  <div>
    <h1>Maze Game</h1>
    <p>Time : {timer} </p>
    <select disabled={isGamePlaying} value={selectedAlgorithm? selectedAlgorithm.value : ""} onChange={(e)=> setSelectedAlgorithm(Algorithm.find((algo) => algo.value === parseInt(e.target.value)) || Algorithm[0])}>
      {Algorithm.map((algo)=>(
        <option value={algo.value} key={algo.value}>{algo.label}</option>
      ))}
    </select>
    {/* TODO : if the game is over then show here */}
    
    {!isGameOver && !isJustStarted && 
       <MazeBoard algorithms={Algorithm} selectedAlgorithm={selectedAlgorithm}/>
    }
  </div>
  </>
}

export default MazeGame;
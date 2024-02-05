import express, { Request, Response, NextFunction } from "express";
import { GenerateMaze } from "./Maze/GenerateMaze";

// const express =  require('express');

const app = express();
const PORT = 3000;

app.use(express.json());
//middleware
function MazeInputValidation(req : Request, res  :Response, next : NextFunction) {
  if(!req.body) {
    res.status(400);
    res.send({msg: 'Please enter all the fields'} as object);
  }
  const {algorithmName, rows, columns, animation} = req.body;
  if(!algorithmName || !rows || !columns || !animation) {
    return res.status(400).json({msg: 'Please enter all the fields'} as object);
  }
  if(algorithmName.toLowerCase().split(' ').join() !== 'huntandkill' || algorithmName.toLowerCase().split(' ').join() !== 'recursivebacktracker') {
    return res.status(400).json({msg: 'Please enter a valid algorithm name'} as object);
  }
  if(typeof rows !== 'number' || typeof columns !== 'number') {
    return res.status(400).json({msg: 'Please enter a valid number for rows and columns'} as object);
  }
  if(rows < 1 || columns < 1 || rows > 100 || columns > 100) {
    return res.status(400).json({msg: 'Please enter a valid number for rows and columns'} as object);
  }
  if(typeof animation !== 'boolean') {
    return res.status(400).json({msg: 'Please enter a valid boolean for animation'} as object);
  }
  next();
}

/**
 * @route GET /generate
 * @desc Generate a new maze and return the json as required
 * @access Public
 * @returns {JSON} - The generated maze
 * @body {algorithmName: string, rows : number, columns: number, animation:boolean}
 * @returns {
 *  maze: {2d array of cells},
 *  solutionPath: {array of {row: number, column: number}},
 *  generatedMazePath: {array of {row: number, column: number}}
 * }
 */
app.get('/generate', MazeInputValidation, (req : Request, res : Response)=> {
  const {algorithmName, rows, columns, animation} = req.body;
  const MazeObj = new GenerateMaze(rows, columns);
  const MazeGrid = MazeObj.generateNewMaze(algorithmName, animation);
  // do the conversion of the maze, maze solution and the animation path to json over here 
  res.status(200).json({msg: 'Hello World'});
})

app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`);
});
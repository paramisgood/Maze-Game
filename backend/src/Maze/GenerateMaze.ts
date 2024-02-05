import { HuntAndKill } from "./Algorithms/HuntAndKill";
import { Cell } from "./Cell";
import { Utils } from "./Utils";

class GenerateMaze {
  private cells: Cell[][] = [];
  private mazeSolution: Cell[] = [];
  private rows:number;
  private columns : number;
  constructor( rows: number, columns: number ) {
    this.rows = rows;
    this.columns = columns;
    
    // initialize the 2d maze grid
    for(let i = 0; i < rows ; i++){
      this.cells[i] = [];
      for(let j = 0; j < columns; j++){
        this.cells[i][j] = new Cell(i,j);
      }
    }

    //map the neighbours 
    this.cells.forEach(row => {
      row.forEach(col => this.mapNeighbors(col))
    });
  }

  generateNewMaze(algorithmName : string, animation: boolean) : Cell[][]{
    if(algorithmName === 'huntandkill'){
      const huntAndKillObj = new HuntAndKill(this.rows, this.columns, animation, this.cells);
      const maze = huntAndKillObj.getGeneratedMaze();
    }
    else if(algorithmName === 'recursivebacktracking'){
      // alog
    }
    // at this return it only need to return the data like this 
    /**
     * {
     *  cells : [ [{x}, {x}, {x}, {x}, {x} ... columns - 1],
     *            [{x}, {x}, {x}, {x}, {x} ... columns - 1],
     *            .
     *            .
     *            .
     *            rows - 1
     *          ]
     * }
     * 
     * each x consists of 
     * {
     *  row: number;
     *  col: number;
     *  northEdge : false;
     *  eastEdge : false;
     *  southEdge : false;
     *  westEdge : false;
     * }
     */
    return this.cells;
  }

  getAnimationPath(){
    
  }

  getSolutionPath(){

  }

  private mapNeighbors(cell : Cell):void{
    if(cell.row - 1 >= 0){
      cell.neighbors.push(this.cells[cell.row - 1][cell.col]);
    }
    if(cell.row + 1 < this.rows){
      cell.neighbors.push(this.cells[cell.row + 1][cell.col]);
    }
    if(cell.col - 1 >= 0){
      cell.neighbors.push(this.cells[cell.row][cell.col - 1]);
    }
    if(cell.col + 1 < this.columns){
      cell.neighbors.push(this.cells[cell.row][cell.col + 1]);
    }
    cell.neighbors = Utils.shuffleArray<Cell>(cell.neighbors);
  }
}

export { GenerateMaze };
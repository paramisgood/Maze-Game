import { Cell } from "../Cell";
import { Utils } from "../Utils";

class HuntAndKill {
  private cells: Cell[][] = [];
  private randomRowNumbers: number[] = [];
  private randomColNumbers: number[] = [];
  private animationPath: Cell[] = [];
  constructor( public row : number, public col : number, public animation:boolean, cells: Cell[][] = []) {
    this.cells = cells;
    if(this.cells.length === 0){
      throw new Error("Cells = 0");
    }
    for(let i = 0; i < row; i++ ){
      this.randomRowNumbers.push(i);
    }
    for(let i = 0; i < col; i++ ){
      this.randomColNumbers.push(i);
    }
    this.randomColNumbers = Utils.shuffleArray<number>(this.randomColNumbers);
    this.randomRowNumbers = Utils.shuffleArray<number>(this.randomRowNumbers);
  }
  private kill(cell : Cell):void {
    while(cell){
      const next = cell.neighbors.find(c => !c.visited);
      if(next){
        cell.connectTo(next);
      }
      if (next === undefined){
        return;
      }
      cell = next;
    } 
  }
  private hunt() : Cell | undefined{
    for(const r of this.randomRowNumbers){
      for(const c of this.randomColNumbers){
        const newCell = this.cells[r][c];
        if(newCell.visited) continue;
        const next = newCell.neighbors.find(c => c.visited);
        if(next) { 
          newCell.connectTo(next);
          return newCell;
        }
      }
    }
    return undefined;
  }
  private huntAndKillAlgorithm() {
    let currentCell  = this.cells[~~(Math.random()*this.row)][~~(Math.random()*this.col)]
    while (currentCell) {
      this.kill(currentCell);
      const temp = this.hunt();
      if(temp === undefined){ return; }
      currentCell = temp;
    }
  }
  getGeneratedMaze(): Cell[][]{
    return this.cells;
  }
}

export { HuntAndKill };
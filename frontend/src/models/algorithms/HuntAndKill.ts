import { Cell } from "../Cell"

export class HuntAndKill{
  public readonly cells: Cell[][] = [];
  public readonly algorithmName: string = "Hunt and Kill";

  private readonly randomRowNumbers: number[] = [];
  private readonly randomColNumbers: number[] = [];

  constructor(public nRows: number, public nCols: number){
    // we have initialized the 2d grid
    if(nRows < 1 || nCols < 1) throw new Error("Invalid number of rows or columns");
    for(let i = 0; i < nRows; i++){
      this.cells[i] = [];
      for(let j = 0; j < nCols; j++){
        this.cells[i][j] = new Cell(i,j);
      }
    }

    // now we will map the neighbours
    this.cells.forEach(row => row.forEach(col => this.mapNeighbours(col)));

    for(let i = 0; i < nCols ; i++){
      this.randomColNumbers.push(i);
    }
    for(let i = 0; i < nRows ; i++){
      this.randomRowNumbers.push(i);
    }
    this.randomColNumbers = Utils.shuffleArray<number>(this.randomColNumbers);
    this.randomRowNumbers = Utils.shuffleArray<number>(this.randomRowNumbers);
    console.log("randomColNumbers : " + this.randomColNumbers);
    console.log("randomRowNumbers : " + this.randomRowNumbers);
    this.huntAndKill();
  }

  public firstCell(c : Cell) : void{
    c.northEdge = false;
  }
  public lastCell(c : Cell) : void{
    c.eastEdge = false;
  }

  // public totalRemainingCells : number = this.nCols * this.nRows;

  // private kill(currentCell : Cell): void{
  //   // let totalRemainingCells : number = this.nCols * this.nRows;
  //   while (currentCell){
  //     const next = currentCell.neighbors.find(neighbourCell => !neighbourCell.visited);
  //     if(next){
  //       currentCell.connectTo(next);
  //       currentCell = next;
  //       console.log(next);
  //       if(next===null) break;       
  //       this.totalRemainingCells = this.totalRemainingCells - 1;
  //       console.log("totalRemainingCells -> " +this.totalRemainingCells);
  //     }else{
  //       break;
  //     }
  //   }
  // }

  private kill(current: Cell) {
    while (current) {
      const next = current.neighbors.find(c => !c.visited);
      if (next) {
        // console.log(`connecting... [${current.row},${current.col}] => [${next.row},${next.col}]`);
        current.connectTo(next);
        // console.log(`connection is DONE [${current.row},${current.col}] => [${next.row},${next.col}]`);
      }
      if (next === undefined){
        console.log("next is undefined");  
        return;
      }
      current = next;
    }
  }
  

  private hunt(): Cell | undefined {
    // console.log("Hunting...");
    for (const r of this.randomRowNumbers) {
      for (const c of this.randomColNumbers) {
        const newCell = this.cells[r][c];
        if (newCell.visited) continue;
        const next = newCell.neighbors.find(c => c.visited);
        if (next) {
          newCell.connectTo(next);
          return newCell;
        } else {
          console.log("Hunting is DONE");
        }
      }
    }
    return undefined;
  }

  // private kill(current: Cell) {
  //   while (current) {
  //     const next = current.neighbors.find(c => !c.visited);
  //     if (next) {
  //       current.connectTo(next);
  //     }
  //     current = next;
  //   }
  // }
  // private hunt(): Cell {
  //   for (const huntRow of this.randomRowNumbers) {
  //     for (const huntColumn of this.randomColNumbers) {
  //       const cell = this.cells[huntRow][huntColumn];
  //       if (cell.visited) {
  //         continue;
  //       }
  //       const next = cell.neighbors.find(c => c.visited);
  //       if (next) {
  //         cell.connectTo(next);
  //         return cell;
  //       }
  //     }
  //   }
  // }

  // private remainingCells(n){
  //   return n - 1
  // }
  
  private huntAndKill() {
    let currentCell = this.cells[~~(Math.random()*this.nRows)][~~(Math.random()*this.nCols)];
    // let currentCell = this.cells[0][0];
    while(currentCell){
      this.kill(currentCell);
      const temp = this.hunt();
      if(temp === undefined) {
        console.log("temp is undefined");
        return;
      }
      currentCell = temp;
    }
  }

  
  /**
   * @param cell 
   * @description it is used to map the coordinates of the surrounding cells
   */
  private mapNeighbours(cell : Cell): void{
    if(cell.row - 1 >= 0){
      cell.neighbors.push(this.cells[cell.row - 1][cell.col]);
    }
    if(cell.row + 1 < this.nRows){
      cell.neighbors.push(this.cells[cell.row + 1][cell.col]);
    }
    if(cell.col - 1 >= 0){
      cell.neighbors.push(this.cells[cell.row][cell.col - 1]);
    }
    if(cell.col + 1 < this.nCols){
      cell.neighbors.push(this.cells[cell.row][cell.col + 1]);
    }
    cell.neighbors=  Utils.shuffleArray<Cell>(cell.neighbors)
  }
}


class Utils{
  //for shuffling the array
  static shuffleArray<T>(arr: T[]): T[] {
    let n = arr.length;
    while (n) {
      const i = Math.floor(Math.random() * n--);
      [arr[n], arr[i]] = [arr[i], arr[n]];
    }
    return arr;
  }
}
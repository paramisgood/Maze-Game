export class Cell{
  /**
   * flags for all the sides/edges of the cell to identify if it is a wall or not and default is true 
   */ 
  northEdge: boolean = true;
  eastEdge: boolean = true;
  southEdge: boolean = true;
  westEdge: boolean = true;

  /**
   * a flag to identify if the cell is visited or not, used in the maze generation and default is false
   */
  visited: boolean = false;

  neighbors: Cell[] = [];
  /**
   *
   */
  constructor(public row: number = 0, public col:number = 0){

  }

  connectTo(anotherCell : Cell){
    
    if(!anotherCell) return;
    if(this.row === anotherCell.row){
      // console.log("row");
      
      if(this.col - 1 === anotherCell.col){
        this.westEdge = false;
        anotherCell.eastEdge = false;
      }
      else if(this.col + 1 === anotherCell.col){
        this.eastEdge = false;
        anotherCell.westEdge = false;
      }
      else return;
    }
    else if(this.col === anotherCell.col){
      // console.log("col");
      
      if(this.row - 1 === anotherCell.row){
        this.northEdge = false;
        anotherCell.southEdge = false;
      }
      else if(this.row + 1 === anotherCell.row){
        this.southEdge = false;
        anotherCell.northEdge = false;
      }
      else return;
    }
    else{ 
      // console.log("just returning from the connectTo function");  
      return;
    }
    this.visited = true;
    anotherCell.visited = true;
    // console.log(`connection is DONE [${this.row},${this.col}] => [${anotherCell.row},${anotherCell.col}]`);
  }

}
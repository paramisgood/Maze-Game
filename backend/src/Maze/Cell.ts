class Cell {
  northEdge:boolean = false;
  eastEdge:boolean = false;
  southEdge:boolean = false;
  westEdge:boolean = false;
  
  visited: boolean = false;
  
  neighbors: Cell[] = [];

  constructor(public row: number = 1, public col:number = 1) {
    
  }

  connectTo(anotherCell : Cell){

    if(!anotherCell) return 
    if(this.row === anotherCell.row){
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
      if(this.row - 1 === anotherCell.row){
        this.northEdge = false;
        anotherCell.southEdge = false;
      }
      else if(this.row + 1 === anotherCell. row){
        this.southEdge = false;
        anotherCell.northEdge = false;
      }
      else return
    }
    else return;
    this.visited = true;
    anotherCell.visited = true;
  }

}

export { Cell };

export class Board{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs=numberOfBombs;
    this._numberOfTiles=numberOfRows*numberOfColumns;
    this._playerBoard=Board.generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard=Board.generateBombBoard(numberOfRows,numberOfColumns, numberOfBombs);
     }

  get playerBoard(){
    return this._playerBoard
  }

  flipTile(rowIndex, columnIndex){
    if(this._playerBoard[rowIndex][columnIndex]!==''){
      console.log('This tile has already been flipped.');
      return;
    } else if(this._bombBoard[rowIndex][columnIndex]==='B') {
      this._playerBoard[rowIndex][columnIndex]='B'
      console.log('You die.');
    }else{
      this._playerBoard[rowIndex][columnIndex] = (this.getNumberofNeighborBombs(rowIndex, columnIndex));
    };

    this._numberOfTiles--;
  }

  getNumberofNeighborBombs(rowIndex, columnIndex){
    let neighborOffsets = [[1,1],[1,-1],[1,0],[0,1],[0,-1],[-1,-1],[-1,0],[-1,1]];
    const numberOfRows=this._bombBoard.length;
    const numberOfColumns=this._bombBoard[0].length;
    let   numberOfBombs = 0

    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];

      if(neighborRowIndex>=0 && neighborRowIndex<numberOfRows && neighborColumnIndex>=0 && neighborColumnIndex<numberOfColumns){
        if(this._bombBoard[neighborRowIndex][neighborColumnIndex]==='B'){
          numberOfBombs++
        };
      };
    });
    return numberOfBombs;
  }

    hasSafeTiles(){
      return(this._numberOfTiles===this.numberOfBombs);
      }


    print(board){
      console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    }

    static generatePlayerBoard(numberOfRows, numberOfColumns){
      let board = [];
      for(let r=0; r<numberOfRows; r++){
        let row = [];
        for(let c=0; c<numberOfColumns; c++){
          row.push('');
        };
        board.push(row);
      };

      return board;
    }


    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
      let board = [];
      //this creates the board
      for(let r=0; r<numberOfRows; r++){
        let row = [];
        for(let c=0; c<numberOfColumns; c++){
          row.push(null);
        };
        board.push(row);
      };

      //this fills the board that's been created
      let numberofBombsPlaced = 0
      while(numberofBombsPlaced<numberOfBombs){
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

        if(board[randomRowIndex][randomColumnIndex]!=='B'){
          board[randomRowIndex][randomColumnIndex]='B';
          numberofBombsPlaced++;
        }
      };
      return board;
    }


}

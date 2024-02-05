```bash
|---Maze
|   |---MazeBoard
|   |   |---MazeGameEngine.ts
|   |   |---MazeBoard.tsx
|   |   |---FetchMazeData.ts
|   |   |---Cell.ts
|   |---OnPause.tsx
|   |---OnGameOver.tsx
|   |---MazeGame.tsx
```
### MazeBoard
- MazeGameEngine.ts -> for the main game logic and printing the maze with animantion
- MazeBoard.tsx -> handles the event listners and other task
- FetchMazeData.ts -> to fetch the maze data from the backend.
- Cell.ts -> holds the basic object cell information.

### Maze 
- MazeBoard - folder
- OnPause.tsx - pause display thingie  
- OnGameOver.tsx - game over display thingie  
- MazeGame.tsx - Handels the timer and OnPause and Game On States with the user inputs to pass the backend  

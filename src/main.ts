import { Grid } from "./Grid.js";
import { TetriMino, TetriMinoType } from "./TetriMino.js";

// Main
(function () {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.width = 300;
    canvas.height = 600;
    const grid = new Grid(canvas);
    grid.drawGrid();

    // while (!grid.isGameOver()) {
    // Game loop
    // Move tetrimino down
    // Check for collision
    // If collision, add tetrimino to grid
    // Check for full rows
    // Remove full rows
    // Create new tetrimino
    // }
    const tetriMino = new TetriMino(30, 30, TetriMinoType.T, "blue");
    tetriMino.render(grid.context);
})();

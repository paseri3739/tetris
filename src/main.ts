import { Grid } from "./Grid.js";
import { TetriMino, TetriMinoType } from "./TetriMino.js";

// Main
(function () {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const grid = new Grid(canvas);
    grid.drawGrid();
    const tetriMino = new TetriMino(1, 1, TetriMinoType.T, "blue");
    tetriMino.render(grid.context);
})();

import { Grid } from "./Grid";
import { CellSize, TetriMino, TetriMinoType } from "./TetriMino";

// Main
(function () {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const cellWidth = CellSize.Width;
    const cellHeight = CellSize.Height;
    const grid = new Grid(canvas, cellWidth, cellHeight);
    grid.drawGrid();

    const tetriMino = new TetriMino(30, 30, TetriMinoType.T, "blue");
    tetriMino.render(grid.context);
})();

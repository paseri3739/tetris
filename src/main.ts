import { Game } from "GameLoop.js";
import { Grid } from "./Grid.js";
import { TetriMino, TetriMinoType } from "./TetriMino.js";

// Main
(function () {
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d")!;
    const grid = new Grid(canvas);
    const tetriMino = new TetriMino(3, 0, TetriMinoType.I, "blue");

    const gameLoop = new Game(context);
    gameLoop.run(performance.now());
})();

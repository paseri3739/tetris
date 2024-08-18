import { Grid } from "./objects/Grid.js";

// Main
(function () {
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    // const gameLoop = new Game(canvas);
    // gameLoop.startLoop();
    const grid = new Grid(0, 0);
    const context = canvas.getContext("2d");
    if (context) {
        grid.render(context);
    }
})();

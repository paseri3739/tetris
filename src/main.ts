import { Game } from "Game";

// Main
(function () {
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d")!;
    const gameLoop = new Game(context);
    gameLoop.startLoop();
})();

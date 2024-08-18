import { Game } from "Game";

// Main
(function () {
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    const gameLoop = new Game(canvas);
    gameLoop.startLoop();
})();

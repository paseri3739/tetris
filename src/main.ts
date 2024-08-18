import { Game } from "./Game.js";

// Main
(function () {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const game = new Game(canvas);
    game.startLoop();
})();

import { Game } from "./Game";

// Main
(function () {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const game = new Game(canvas);
    game.startLoop();
})();

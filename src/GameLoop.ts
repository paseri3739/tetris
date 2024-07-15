import { GameController } from "./GameController";

/**
 * GameLoop class. This class will handle the game loop.
 */
export class GameLoop {
    private currentTimestamp: number = 0;
    private readonly gameController: GameController;
    constructor(controller: GameController) {
        this.gameController = controller;
    }
    /**
     * Start the game loop.
     * @param timeStamp timestamp in milliseconds
     */
    run(timeStamp: number) {
        const deltaTime = timeStamp - this.currentTimestamp / 1000; // Convert to seconds
        this.currentTimestamp = timeStamp;
        this.update(deltaTime);
        this.render();
        requestAnimationFrame(this.run.bind(this));
    }
    stop() {}
    /**
     * Update the game state based on the elapsed time.
     * @param deltaTime milliseconds
     */
    update(deltaTime: number) {}
    /**
     * Render the game state.
     */
    render() {}
}

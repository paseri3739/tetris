import { GameObject } from "interfaces/GameObject";

/**
 * GameLoop class. This class will handle the game loop.
 */
export class Game {
    private isRunning: boolean = false;
    private currentTimestamp: number = 0;
    private request: number = 0;
    private readonly gameObjects: GameObject[];
    private readonly context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        if (!context) {
            throw new Error("CanvasRenderingContext2D is required.");
        }
        this.context = context;
        this.gameObjects = [];
    }

    /**
     * Start the game loop.
     * @param timeStamp timestamp in milliseconds
     */
    runLoop(timeStamp: number) {
        this.isRunning = true;
        const deltaTime = (timeStamp - this.currentTimestamp) / 1000; // Convert to seconds
        this.currentTimestamp = timeStamp;
        this.update(deltaTime);
        this.render();
        this.request = requestAnimationFrame(this.runLoop.bind(this));
    }

    stopLoop() {
        cancelAnimationFrame(this.request);
    }

    /**
     * Add a renderable object to the game loop.
     * @param renderable IRenderable
     */
    addGameObject(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
    }

    /**
     * Update the game state based on the elapsed time.
     * @param deltaTime seconds
     */
    private update(deltaTime: number) {
        for (const gameObject of this.gameObjects) {
            gameObject.update(deltaTime);
        }
    }

    /**
     * Render the game state.
     */
    private render() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // 画面をクリア
        for (const gameObject of this.gameObjects) {
            gameObject.render(this.context);
        }
    }
}

import { GameObject } from "interfaces/GameObject";

/**
 * GameLoop class. This class will handle the game loop.
 */
export class Game {
    private currentTimestamp: number = 0;
    private request: number = 0;
    private readonly gameObjects: GameObject[];
    private readonly context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.gameObjects = [];
    }

    /**
     * Start the game loop.
     * @param timeStamp timestamp in milliseconds
     */
    run(timeStamp: number) {
        const deltaTime = (timeStamp - this.currentTimestamp) / 1000; // Convert to seconds
        this.currentTimestamp = timeStamp;
        this.update(deltaTime);
        this.render();
        this.request = requestAnimationFrame(this.run.bind(this));
    }

    stop() {
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
    update(deltaTime: number) {
        for (const gameObject of this.gameObjects) {
            gameObject.update(deltaTime);
        }
    }

    /**
     * Render the game state.
     */
    render() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // 画面をクリア
        for (const gameObject of this.gameObjects) {
            gameObject.render(this.context);
        }
    }
}

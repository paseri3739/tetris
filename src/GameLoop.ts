import { Renderable } from "./interfaces/Renderable.js";
import { Updatable } from "./interfaces/Updatable.js";

/**
 * GameLoop class. This class will handle the game loop.
 */
export class GameLoop {
    private currentTimestamp: number = 0;
    private request: number = 0;
    private readonly updatables: Updatable[];
    private readonly renderables: Renderable[];
    private readonly context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.updatables = [];
        this.renderables = [];
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
     * Add an updatable object to the game loop.
     * @param updatable IUpdatable
     */
    addUpdatable(updatable: Updatable) {
        this.updatables.push(updatable);
    }

    /**
     * Add a renderable object to the game loop.
     * @param renderable IRenderable
     */
    addRenderable(renderable: Renderable) {
        this.renderables.push(renderable);
    }

    /**
     * Update the game state based on the elapsed time.
     * @param deltaTime seconds
     */
    update(deltaTime: number) {
        for (const updatable of this.updatables) {
            updatable.update(deltaTime);
        }
    }

    /**
     * Render the game state.
     */
    render() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // 画面をクリア
        for (const renderable of this.renderables) {
            renderable.render(this.context);
        }
    }
}

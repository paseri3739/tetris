import { InputSystem } from "input_system/InputSystem";
import { KeyboardInput } from "input_system/KeyboardInput";
import { GameObject } from "interfaces/GameObject";
import { Scene } from "interfaces/Scene";

/**
 * GameLoop class. This class will handle the game loop.
 */
export class Game {
    private isRunning: boolean = false;
    private currentTimestamp: number = 0;
    // id of the requestAnimationFrame. This is used to stop the game loop.
    private request: number = 0;
    private scenes: Scene[] = [];
    private currentScene: Scene | null = null;
    private readonly inputSystem: InputSystem;
    private gameObjects: GameObject[] = [];
    private readonly context: CanvasRenderingContext2D;
    private readonly targetFrameTime: number = 1000 / 60; // 60fpsを目標とするフレーム時間

    constructor(context: CanvasRenderingContext2D) {
        if (!context) {
            throw new Error("CanvasRenderingContext2D is required.");
        }
        this.context = context;
        this.inputSystem = new InputSystem([new KeyboardInput()]);
    }

    addScene(scene: Scene) {
        this.scenes.push(scene);
        scene.game = this;
    }

    changeScene(scene: Scene) {
        this.scenes = [scene];
        scene.game = this;
    }

    /**
     * Start the game loop.
     * @param currentTimeStamp timestamp in milliseconds
     */
    private runLoop(currentTimeStamp: number) {
        if (!this.isRunning) return; // isRunningがfalseならばループを終了
        if (!this.scenes) return;

        const deltaTime = currentTimeStamp - this.currentTimestamp;

        // deltaTimeが目標フレーム時間に達していなければ次のフレームへ進む
        if (deltaTime < this.targetFrameTime) {
            this.request = requestAnimationFrame(this.runLoop.bind(this));
            return;
        }

        this.currentTimestamp = currentTimeStamp;
        const seconds = deltaTime / 1000; // Convert to seconds

        // this.update(seconds);
        // this.render();
        this.currentScene?.processInput(this.inputSystem);
        this.currentScene?.update(deltaTime);
        this.currentScene?.render(this.context);
        this.request = requestAnimationFrame(this.runLoop.bind(this));
    }

    /**
     * Start the game.
     */
    startLoop() {
        this.isRunning = true;
        this.currentTimestamp = performance.now(); // タイムスタンプを初期化
        this.runLoop(this.currentTimestamp); // ゲームループを開始
    }

    /**
     * Stop the game loop.
     */
    stopLoop() {
        this.isRunning = false;
        cancelAnimationFrame(this.request); // アニメーションフレームをキャンセル
    }

    /**
     * Add a renderable object to the game loop.
     * @param renderable IRenderable
     */
    addGameObject(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
    }

    /**
     * Remove a renderable object from the game loop.
     * @param gameObject
     */
    removeGameObject(gameObject: GameObject) {
        const index = this.gameObjects.indexOf(gameObject);
        if (index !== -1) {
            this.gameObjects.splice(index, 1);
        }
    }
}

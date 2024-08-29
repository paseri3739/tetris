import { InputSystem } from "./common/input_system/InputSystem";
import { KeyboardInput } from "./common/input_system/KeyboardInput";
import { Scene } from "./common/interfaces/Scene";
import { GAME_CONFIG } from "./game_config";
import { DefaultScene } from "./scenes/default_scene/DefaultScene";

/**
 * GameLoop class. This class will handle the game loop.
 */
export class Game {
    private isRunning: boolean = false;
    private currentTimestamp: number = 0;
    // id of the requestAnimationFrame. This is used to stop the game loop.
    private request: number = 0;
    private scenes: Scene[] = [];
    private currentScene: Scene;
    private readonly inputSystem: InputSystem;
    private canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private readonly targetFrameTime: number = 1000 / 60; // 60fpsを目標とするフレーム時間

    constructor(canvas: HTMLCanvasElement) {
        if (!canvas) {
            throw new Error("Canvas is required.");
        }

        this.canvas = canvas;
        this.canvas.width = GAME_CONFIG.canvas.width;
        this.canvas.height = GAME_CONFIG.canvas.height;
        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("Failed to get 2D context.");
        }

        // デバイスピクセル比を取得
        const dpr = window.devicePixelRatio || 1;

        // キャンバスの実際のピクセルサイズを設定
        canvas.style.width = `${canvas.width}px`;
        canvas.style.height = `${canvas.height}px`;

        // キャンバスの解像度を調整
        canvas.width *= dpr;
        canvas.height *= dpr;

        // コンテキストのスケールを調整
        context.scale(dpr, dpr);

        this.context = context;
        this.inputSystem = new InputSystem([new KeyboardInput()]);
        this.currentScene = new DefaultScene(this);
    }

    getInputSystem(): InputSystem {
        return this.inputSystem;
    }

    getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    addScene(scene: Scene) {
        this.scenes.push(scene);
        scene.game = this;
    }

    removeScene(scene: Scene) {
        const index = this.scenes.indexOf(scene);
        if (index > -1) {
            this.scenes.splice(index, 1);
            scene.close();
        }
    }

    changeScene(scene: Scene) {
        if (this.currentScene) {
            this.currentScene.close();
        }
        this.currentScene = scene;
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

        this.currentScene.processInput(this.inputSystem);
        this.currentScene.update(deltaTime);
        this.currentScene.render(this.context);
        this.request = requestAnimationFrame(this.runLoop.bind(this));
    }

    /**
     * Start the game.
     */
    startLoop() {
        this.isRunning = true;
        this.currentTimestamp = window.performance.now(); // タイムスタンプを初期化
        this.runLoop(this.currentTimestamp); // ゲームループを開始
    }

    /**
     * Stop the game loop.
     */
    stopLoop() {
        this.isRunning = false;
        cancelAnimationFrame(this.request); // アニメーションフレームをキャンセル
    }
}

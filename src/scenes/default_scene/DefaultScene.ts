import { Game } from "Game";
import { InputSystem } from "common/input_system/InputSystem";
import { DynamicGameObject } from "common/interfaces/DynamicGameObject";
import { Scene } from "common/interfaces/Scene";

export class DefaultScene implements Scene {
    game: Game;
    dynamicGameObjects: DynamicGameObject[];
    constructor(game: Game) {
        this.game = game;
        this.dynamicGameObjects = [];
    }
    close(): void {
        throw new Error("Method not implemented.");
    }
    addGameObject(gameObject: DynamicGameObject): void {
        throw new Error("Method not implemented.");
    }
    removeGameObject(gameObject: DynamicGameObject): void {
        throw new Error("Method not implemented.");
    }
    update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }
    render(context: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
    processInput(input: InputSystem): void {
        throw new Error("Method not implemented.");
    }
}

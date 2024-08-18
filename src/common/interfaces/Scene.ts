import { Game } from "Game";
import { InputSystem } from "input_system/InputSystem";
import { DynamicGameObject } from "./DynamicGameObject";

export interface Scene {
    game: Game;
    gameObjects: DynamicGameObject[];
    addGameObject(gameObject: DynamicGameObject): void;
    removeGameObject(gameObject: DynamicGameObject): void;
    update(deltaTime: number): void;
    render(context: CanvasRenderingContext2D): void;
    processInput(input: InputSystem): void;
    close(): void;
}

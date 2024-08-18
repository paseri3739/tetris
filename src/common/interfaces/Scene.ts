import { Game } from "Game";
import { InputSystem } from "input_system/InputSystem";
import { GameObject } from "./GameObject";

export interface Scene {
    game: Game;
    gameObjects: GameObject[];
    addGameObject(gameObject: GameObject): void;
    removeGameObject(gameObject: GameObject): void;
    update(deltaTime: number): void;
    render(context: CanvasRenderingContext2D): void;
    processInput(input: InputSystem): void;
    close(): void;
}

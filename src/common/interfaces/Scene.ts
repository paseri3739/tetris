import { InputSystem } from "../../common/input_system/InputSystem.js";
import { Game } from "../../Game.js";

export interface Scene {
    game: Game;
    update(deltaTime: number): void;
    render(context: CanvasRenderingContext2D): void;
    processInput(input: InputSystem): void;
    close(): void;
}

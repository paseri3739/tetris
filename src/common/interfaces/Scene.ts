import { InputSystem } from "../../common/input_system/InputSystem";
import { Game } from "../../Game";

export interface Scene {
    game: Game;
    update(deltaTime: number): void;
    render(context: CanvasRenderingContext2D): void;
    processInput(input: InputSystem): void;
    close(): void;
}

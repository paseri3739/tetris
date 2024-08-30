import { InputSystem } from "../../common/input_system/InputSystem";

export interface Scene {
    update(deltaTime: number): void;
    render(context: CanvasRenderingContext2D): void;
    processInput(input: InputSystem): void;
    close(): void;
}

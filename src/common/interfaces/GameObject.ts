import { InputSystem } from "input_system/InputSystem";

export interface GameObject {
    update(deltaTime: number, ...args: any[]): void;
    render(context: CanvasRenderingContext2D): void;
    processInput(input: InputSystem): void;
}
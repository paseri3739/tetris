import { InputSystem } from "common/input_system/InputSystem";
import { GameObject } from "common/interfaces/GameObject";

/**
 * Grid class represents a grid of cells.
 */
export class Grid implements GameObject {
    constructor() {}
    update(deltaTime: number, ...args: any[]): void {
        throw new Error("Method not implemented.");
    }
    render(context: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
    processInput(input: InputSystem): void {
        throw new Error("Method not implemented.");
    }
}

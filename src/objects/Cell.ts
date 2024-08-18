import { InputSystem } from "common/input_system/InputSystem";
import { GameObject } from "common/interfaces/GameObject";

enum CellStatus {
    Empty = 0,
    Filled = 1,
}
/**
 * Cell class represents a single cell in the grid.
 */
export class Cell implements GameObject {
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

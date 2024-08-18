import { InputSystem } from "common/input_system/InputSystem";
import { GameObject } from "common/interfaces/GameObject";

enum CellStatus {
    Empty = 0,
    Filled = 1,
}
export enum CellSize {
    Width = 30, // 30px
    Height = 30, // 30px
}
/**
 * Cell class represents a single cell in the grid.
 */
export class Cell implements GameObject {
    cellStatus: CellStatus = CellStatus.Empty;
    cellWidth: CellSize = CellSize.Width;
    cellHeight: CellSize = CellSize.Height;

    constructor(status: CellStatus, width: CellSize, height: CellSize) {
        this.cellStatus = status;
        this.cellWidth = width;
        this.cellHeight = height;
    }
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

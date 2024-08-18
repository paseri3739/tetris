import { InputSystem } from "common/input_system/InputSystem";
import { GameObject } from "common/interfaces/GameObject";
import { CellSize } from "./Cell";
export enum GridTable {
    Rows = 20, // 20行
    Cols = 10, // 10列
}

export enum GridPixel {
    Width = CellSize.Width * GridTable.Cols, // 300px
    Height = CellSize.Height * GridTable.Rows, // 600px
}
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

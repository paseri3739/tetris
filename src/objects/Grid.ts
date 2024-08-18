import { InputSystem } from "common/input_system/InputSystem";
import { GameObject } from "common/interfaces/GameObject";
import { Cell, CellSize, CellStatus } from "./Cell";
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
    private grid: Cell[][] = [];
    private rows: GridTable = GridTable.Rows;
    private cols: GridTable = GridTable.Cols;
    private width: GridPixel = GridPixel.Width;
    private height: GridPixel = GridPixel.Height;

    constructor(gridTable?: GridTable, gridPixel?: GridPixel) {
        if (gridTable !== undefined) {
            this.rows = gridTable;
            this.cols = gridTable;
        }

        if (gridPixel !== undefined) {
            this.width = gridPixel;
            this.height = gridPixel;
        }

        // gridの各行と各列に新しいCellを割り当てる
        this.grid = new Array(this.rows)
            .fill(null)
            .map(() => new Array(this.cols).fill(null).map(() => new Cell(CellStatus.Empty, CellSize.Width, CellSize.Height)));
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

import { StaticGameObject } from "common/interfaces/StaticGameObject.js";
import { Cell, CellSize, CellStatus } from "./Cell.js";
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
export class Grid implements StaticGameObject {
    x: number;
    y: number;
    cells: Cell[][];

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.cells = [];
        for (let i = 0; i < GridTable.Rows; i++) {
            this.cells[i] = [];
            for (let j = 0; j < GridTable.Cols; j++) {
                this.cells[i][j] = new Cell(
                    this.x + j * CellSize.Width,
                    this.y + i * CellSize.Height,
                    CellStatus.Empty,
                    CellSize.Width,
                    CellSize.Height
                );
            }
        }
    }

    render(context: CanvasRenderingContext2D): void {
        for (let i = 0; i < GridTable.Rows; i++) {
            for (let j = 0; j < GridTable.Cols; j++) {
                this.cells[i][j].render(context);
            }
        }
    }
}

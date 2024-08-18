import { StaticGameObject } from "common/interfaces/StaticGameObject";
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
export class Grid implements StaticGameObject {
    position: { x: number; y: number };
    cells: Cell[][];

    constructor(position: { x: number; y: number }) {
        this.position = position;
        this.cells = [];
        for (let i = 0; i < GridTable.Rows; i++) {
            this.cells[i] = [];
            for (let j = 0; j < GridTable.Cols; j++) {
                this.cells[i][j] = new Cell(
                    { x: this.position.x + j * CellSize.Width, y: this.position.y + i * CellSize.Height },
                    CellStatus.Empty,
                    CellSize.Width,
                    CellSize.Height
                );
            }
        }
    }

    render(context: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
}

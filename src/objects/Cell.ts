import { StaticGameObject } from "./common/interfaces/StaticGameObject.js";

export enum CellStatus {
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
export class Cell implements StaticGameObject {
    x: number;
    y: number;
    cellStatus: CellStatus = CellStatus.Empty;
    cellWidth: CellSize = CellSize.Width;
    cellHeight: CellSize = CellSize.Height;

    constructor(x: number, y: number, cellStatus: CellStatus, cellWidth: CellSize, cellHeight: CellSize) {
        this.x = x;
        this.y = y;
        this.cellStatus = cellStatus;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
    }

    render(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.cellStatus === CellStatus.Empty ? "white" : "black";
    }
}

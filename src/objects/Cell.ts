import { StaticGameObject } from "../common/interfaces/StaticGameObject.js";
import { GAME_CONFIG } from "../game_config.js";

export enum CellStatus {
    Empty = 0,
    Filled = 1,
}

/**
 * Cell class represents a single cell in the grid.
 */
export class Cell implements StaticGameObject {
    x: number;
    y: number;
    cellStatus: CellStatus = CellStatus.Empty;
    cellWidth: number = GAME_CONFIG.cell.width;
    cellHeight: number = GAME_CONFIG.cell.height;

    constructor(x: number, y: number, cellStatus: CellStatus, cellWidth: number, cellHeight: number) {
        this.x = x;
        this.y = y;
        this.cellStatus = cellStatus;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
    }
    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }

    render(context: CanvasRenderingContext2D | null): void {
        if (!context) {
            console.error("Context is undefined. Ensure a valid CanvasRenderingContext2D is passed.");
            return;
        }

        context.fillStyle = this.cellStatus === CellStatus.Empty ? "white" : "black";
        context.fillRect(this.x, this.y, this.cellWidth, this.cellHeight);
    }
}

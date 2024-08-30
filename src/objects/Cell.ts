import { StaticGameObject } from "../common/interfaces/StaticGameObject";
import { GAME_CONFIG } from "../game_config";

export enum CellStatus {
    Empty = 0,
    Filled = 1,
}

/**
 * Cell class represents a single cell in the grid.
 */
export class Cell implements StaticGameObject {
    private x: number;
    private y: number;
    private cellStatus: CellStatus = CellStatus.Empty;
    static cellWidth: number = GAME_CONFIG.cell.width;
    static cellHeight: number = GAME_CONFIG.cell.height;

    constructor(x: number, y: number, cellStatus: CellStatus) {
        this.x = x;
        this.y = y;
        this.cellStatus = cellStatus;
    }
    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }

    setCellStatus(cellStatus: CellStatus): void {
        this.cellStatus = cellStatus;
    }

    getCellStatus(): CellStatus {
        return this.cellStatus;
    }

    render(context: CanvasRenderingContext2D | null): void {
        if (!context) {
            console.error("Context is undefined. Ensure a valid CanvasRenderingContext2D is passed.");
            return;
        }

        context.fillStyle = this.cellStatus === CellStatus.Empty ? "white" : "black";
        context.fillRect(this.x, this.y, Cell.cellWidth, Cell.cellHeight);
    }
}

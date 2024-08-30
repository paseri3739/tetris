import { StaticGameObject } from "../common/interfaces/StaticGameObject";
import { GAME_CONFIG } from "../game_config";
import { Cell, CellStatus } from "./Cell";
import { TetriMino } from "./TetriMino";

/**
 * Grid class represents a grid of cells.
 */
export class Grid implements StaticGameObject {
    private x: number;
    private y: number;
    private cells: Cell[][];
    static width: number = GAME_CONFIG.cell.width * GAME_CONFIG.grid.cols;
    static height: number = GAME_CONFIG.cell.height * GAME_CONFIG.grid.rows;
    static rows: number = GAME_CONFIG.grid.rows;
    static cols: number = GAME_CONFIG.grid.cols;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.cells = [];
        for (let i = 0; i < Grid.rows; i++) {
            this.cells[i] = [];
            for (let j = 0; j < Grid.cols; j++) {
                this.cells[i][j] = new Cell(this.x + j * Cell.cellWidth, this.y + i * Cell.cellHeight, CellStatus.Empty);
            }
        }
    }

    static gridPositionToPixelPosition(x: number, y: number): { x: number; y: number } {
        return {
            x: x * Cell.cellWidth,
            y: y * Cell.cellHeight,
        };
    }

    static gridPositionX(x: number): number {
        return x * Cell.cellWidth;
    }

    static gridPositionY(y: number): number {
        return y * Cell.cellHeight;
    }

    static getColumnIndexFromX(x: number): number {
        return Math.floor(x / Cell.cellWidth);
    }

    static getRowIndexFromY(y: number): number {
        return Math.floor(y / Cell.cellHeight);
    }

    static getWidth(): number {
        return Grid.width;
    }

    static getHeight(): number {
        return Grid.height;
    }

    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }

    render(context: CanvasRenderingContext2D): void {
        for (let i = 0; i < Grid.rows; i++) {
            for (let j = 0; j < Grid.cols; j++) {
                this.cells[i][j].render(context);

                // セルの境界線を描画
                context.strokeStyle = "black";
                context.strokeRect(this.cells[i][j].getX(), this.cells[i][j].getY(), Cell.cellWidth, Cell.cellHeight);
            }
        }
    }

    update(): void {
        this.clearFilledRows();
    }

    mapTetriMinoToGrid(tetriMino: TetriMino): void {
        const shape = tetriMino.getShape();
        const posX = tetriMino.getX();
        const posY = tetriMino.getY();

        shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 1) {
                    const gridX = posX + x;
                    const gridY = posY + y;
                    if (this.isWithinBounds(gridX, gridY)) {
                        this.cells[gridY][gridX].setCellStatus(CellStatus.Filled);
                    }
                }
            });
        });
    }

    unmapTetriMinoFromGrid(tetriMino: TetriMino): void {
        const shape = tetriMino.getShape();
        const posX = tetriMino.getX();
        const posY = tetriMino.getY();

        shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 1) {
                    const gridX = posX + x;
                    const gridY = posY + y;
                    if (this.isWithinBounds(gridX, gridY)) {
                        this.cells[gridY][gridX].setCellStatus(CellStatus.Empty);
                    }
                }
            });
        });
    }

    /**
     *
     * @param column
     * @param row
     * @returns
     */
    isWithinBounds(column: number, row: number): boolean {
        return column >= 0 && column < Grid.cols && row >= 0 && row < Grid.rows;
    }

    clearFilledRows(): void {
        for (let i = 0; i < Grid.rows; i++) {
            const isRowFilled = this.cells[i].every((cell) => cell.getCellStatus() === CellStatus.Filled);
            if (isRowFilled) {
                this.cells.splice(i, 1);
                this.cells.unshift(Array.from({ length: Grid.cols }, () => new Cell(0, 0, CellStatus.Empty)));
            }
        }
    }

    isTetriMinoColliding(tetriMino: TetriMino): boolean {
        const shape = tetriMino.getShape();
        const posX = tetriMino.getX();
        const posY = tetriMino.getY();

        return shape.some((row, y) => {
            return row.some((cell, x) => {
                if (cell === 1) {
                    const gridX = posX + x;
                    const gridY = posY + y;
                    if (this.isWithinBounds(gridX, gridY)) {
                        return this.cells[gridY][gridX].setCellStatus(CellStatus.Filled);
                    }
                }
                return false;
            });
        });
    }
}

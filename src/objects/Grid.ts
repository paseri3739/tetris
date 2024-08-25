import { StaticGameObject } from "../common/interfaces/StaticGameObject.js";
import { GAME_CONFIG } from "../game_config.js";
import { Cell, CellStatus } from "./Cell.js";
import { TetriMino, TetriMinoShapes } from "./TetriMino.js";

export enum GridPixel {
    Width = GAME_CONFIG.cell.width * GAME_CONFIG.grid.cols, // 300px
    Height = GAME_CONFIG.cell.height * GAME_CONFIG.grid.rows, // 600px
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
        for (let i = 0; i < GAME_CONFIG.grid.rows; i++) {
            this.cells[i] = [];
            for (let j = 0; j < GAME_CONFIG.grid.cols; j++) {
                this.cells[i][j] = new Cell(
                    this.x + j * GAME_CONFIG.cell.width,
                    this.y + i * GAME_CONFIG.cell.height,
                    CellStatus.Empty,
                    GAME_CONFIG.cell.width,
                    GAME_CONFIG.cell.height
                );
            }
        }
    }
    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }

    render(context: CanvasRenderingContext2D): void {
        for (let i = 0; i < GAME_CONFIG.grid.rows; i++) {
            for (let j = 0; j < GAME_CONFIG.grid.cols; j++) {
                this.cells[i][j].render(context);

                // セルの境界線を描画
                context.strokeStyle = "black";
                context.strokeRect(
                    this.cells[i][j].x,
                    this.cells[i][j].y,
                    this.cells[i][j].cellWidth,
                    this.cells[i][j].cellHeight
                );
            }
        }
    }

    update(): void {
        this.clearFilledRows();
    }

    mapTetriMinoToGrid(tetriMino: TetriMino): void {
        const shape = TetriMinoShapes[tetriMino.getType()];
        const posX = tetriMino.x;
        const posY = tetriMino.y;

        shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 1) {
                    const gridX = posX + x;
                    const gridY = posY + y;
                    if (this.isWithinBounds(gridX, gridY)) {
                        this.cells[gridY][gridX].cellStatus = CellStatus.Filled;
                    }
                }
            });
        });
    }

    unmapTetriMinoFromGrid(tetriMino: TetriMino): void {
        const shape = TetriMinoShapes[tetriMino.getType()];
        const posX = tetriMino.x;
        const posY = tetriMino.y;

        shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 1) {
                    const gridX = posX + x;
                    const gridY = posY + y;
                    if (this.isWithinBounds(gridX, gridY)) {
                        this.cells[gridY][gridX].cellStatus = CellStatus.Empty;
                    }
                }
            });
        });
    }

    isWithinBounds(x: number, y: number): boolean {
        return x >= 0 && x < GAME_CONFIG.grid.cols && y >= 0 && y < GAME_CONFIG.grid.rows;
    }

    clearFilledRows(): void {
        for (let i = 0; i < GAME_CONFIG.grid.rows; i++) {
            const isRowFilled = this.cells[i].every((cell) => cell.cellStatus === CellStatus.Filled);
            if (isRowFilled) {
                this.cells.splice(i, 1);
                this.cells.unshift(Array.from({ length: GAME_CONFIG.grid.cols }, () => new Cell(0, 0, CellStatus.Empty, 0, 0)));
            }
        }
    }

    isTetriMinoColliding(tetriMino: TetriMino): boolean {
        const shape = TetriMinoShapes[tetriMino.getType()];
        const posX = tetriMino.x;
        const posY = tetriMino.y;

        return shape.some((row, y) => {
            return row.some((cell, x) => {
                if (cell === 1) {
                    const gridX = posX + x;
                    const gridY = posY + y;
                    if (this.isWithinBounds(gridX, gridY)) {
                        return this.cells[gridY][gridX].cellStatus === CellStatus.Filled;
                    }
                }
                return false;
            });
        });
    }
}

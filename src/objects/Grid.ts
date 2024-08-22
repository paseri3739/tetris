import { StaticGameObject } from "../common/interfaces/StaticGameObject.js";
import { Cell, CellSize, CellStatus } from "./Cell.js";
import { TetriMino, TetriMinoShapes } from "./TetriMino.js";
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
    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }

    render(context: CanvasRenderingContext2D): void {
        for (let i = 0; i < GridTable.Rows; i++) {
            for (let j = 0; j < GridTable.Cols; j++) {
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

    private isWithinBounds(x: number, y: number): boolean {
        return x >= 0 && x < GridTable.Cols && y >= 0 && y < GridTable.Rows;
    }
}

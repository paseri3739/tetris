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
    static readonly width: number = GAME_CONFIG.cell.width * GAME_CONFIG.grid.cols;
    static readonly height: number = GAME_CONFIG.cell.height * GAME_CONFIG.grid.rows;
    static readonly rows: number = GAME_CONFIG.grid.rows;
    static readonly cols: number = GAME_CONFIG.grid.cols;

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

    static getWidth(): number {
        return Grid.width;
    }

    static getHeight(): number {
        return Grid.height;
    }

    gridPositionToPixelPosition(x: number, y: number): { x: number; y: number } {
        return {
            x: x * Cell.cellWidth + this.x,
            y: y * Cell.cellHeight + this.y,
        };
    }

    gridPositionX(x: number): number {
        return x * Cell.cellWidth + this.x;
    }

    gridPositionY(y: number): number {
        return y * Cell.cellHeight + this.y;
    }

    /**
     * 与えられたx座標から、このグリッドインスタンス内での列のインデックスを取得します。
     * @param x グリッド内でのx座標
     * @returns 列のインデックス
     */
    getColumnIndexFromX(x: number): number {
        return Math.floor((x - this.x) / Cell.cellWidth);
    }

    /**
     * 与えられたy座標から、このグリッドインスタンス内での行のインデックスを取得します。
     * @param y グリッド内でのy座標
     * @returns 行のインデックス
     */
    getRowIndexFromY(y: number): number {
        return Math.floor((y - this.y) / Cell.cellHeight);
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

    /**
     * グリッド上の相対座標を取得します。
     * @param columnIndex 列のインデックス
     * @param rowIndex 行のインデックス
     * @returns 相対座標 { x: number, y: number }
     */
    getRelativePosition(columnIndex: number, rowIndex: number): { x: number; y: number } {
        if (!this.isWithinBounds(columnIndex, rowIndex)) {
            throw new Error("指定されたインデックスはグリッドの範囲外です");
        }
        return {
            x: columnIndex * Cell.cellWidth - this.x,
            y: rowIndex * Cell.cellHeight - this.y,
        };
    }

    /**
     * 与えられた座標からグリッド上の行と列のインデックスを取得します。
     * @param x 相対座標系でのX位置
     * @param y 相対座標系でのY位置
     * @returns インデックス { column: number, row: number }
     */
    getGridIndexFromRelativePosition(x: number, y: number): { column: number; row: number } {
        const columnIndex = Math.floor((x + this.x) / Cell.cellWidth);
        const rowIndex = Math.floor((y + this.y) / Cell.cellHeight);
        if (!this.isWithinBounds(columnIndex, rowIndex)) {
            throw new Error("計算されたインデックスはグリッドの範囲外です");
        }
        return { column: columnIndex, row: rowIndex };
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
        // TODO: 判定ロジックを変更する
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

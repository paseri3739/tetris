import { GridSize } from "./TetriMino.js";

export enum CellSize {
    Width = 30,
    Height = 30,
}

/**
 * Cell class represents a single cell in the grid.
 */
export class Cell {
    x: number;
    y: number;
    width: number;
    height: number;

    /**
     * Create a new cell.
     * @param x
     * @param y
     * @param width
     * @param height
     */
    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * Draw the cell on the canvas.
     * @param context CanvasRenderingContext2D
     */
    public draw(context: CanvasRenderingContext2D) {
        context.strokeStyle = "#ddd";
        context.lineWidth = 1;
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
}
/**
 * Grid class represents a grid of cells.
 */
export class Grid {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    cellWidth: number;
    cellHeight: number;
    cells: Cell[][];

    constructor(canvas: HTMLCanvasElement, cellWidth: number, cellHeight: number) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d")!;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.cells = [];

        this.createGrid();
    }

    /**
     * Create a grid of cells.
     * Calculate the number of rows and columns based on the canvas size and the Cell size.
     */
    private createGrid() {
        const rows = Math.floor(this.canvas.height / this.cellHeight);
        const cols = Math.floor(this.canvas.width / this.cellWidth);

        for (let y = 0; y < rows; y++) {
            this.cells[y] = [];
            for (let x = 0; x < cols; x++) {
                this.cells[y][x] = new Cell(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
            }
        }
    }

    /**
     * Draw the grid on the canvas.
     */
    public drawGrid() {
        for (const row of this.cells) {
            for (const cell of row) {
                cell.draw(this.context);
            }
        }
    }

    public isGameOver(): boolean {
        return false;
    }

    public isRowFull(row: number): boolean {
        for (const cell of this.cells[row]) {
            if (cell.width === 0) {
                return false;
            }
        }
        return true;
    }

    public clearRow(row: number): void {
        this.cells.splice(row, 1);
        this.cells.unshift(new Array(GridSize.Cols).fill(0));
    }

    public clearRows(): void {
        for (let row = 0; row < this.cells.length; row++) {
            if (this.isRowFull(row)) {
                this.clearRow(row);
            }
        }
    }
}

import { CellSize, GridPixel, GridTable } from "enums/GridEnums";
import { Renderable } from "interfaces/Renderable.js";
import { Updatable } from "interfaces/Updatable.js";

enum CellStatus {
    Empty = 0,
    Filled = 1,
}
/**
 * Cell class represents a single cell in the grid.
 */
export class Cell {
    x: number;
    y: number;
    width: number;
    height: number;
    value: number;

    /**
     * Create a new cell.
     * @param x
     * @param y
     * @param width
     * @param height
     * @param value
     */
    constructor(x: number, y: number, value: CellStatus) {
        this.x = x;
        this.y = y;
        this.width = CellSize.Width;
        this.height = CellSize.Height;
        this.value = value;
    }

    /**
     * Draw the cell on the canvas.
     * @param context CanvasRenderingContext2D
     */
    public render(context: CanvasRenderingContext2D) {
        context.strokeStyle = "#ddd";
        context.lineWidth = 1;
        context.strokeRect(this.x, this.y, this.width, this.height);

        if (this.value === 1) {
            context.fillStyle = "#000";
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

/**
 * Grid class represents a grid of cells.
 */
export class Grid implements Updatable, Renderable {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    cellWidth: number;
    cellHeight: number;
    cells: Cell[][];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        canvas.width = GridPixel.Width;
        canvas.height = GridPixel.Height;
        this.context = canvas.getContext("2d")!;
        this.cellWidth = CellSize.Width;
        this.cellHeight = CellSize.Height;
        this.cells = [];

        this.createGrid();
    }
    update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }

    /**
     * render the grid on the canvas.
     * @param context
     */
    render(context: CanvasRenderingContext2D): void {
        this.drawGrid();
    }

    /**
     * Create a grid of cells.
     * Calculate the number of rows and columns based on the canvas size and the Cell size.
     */
    private createGrid() {
        const rows = GridTable.Rows; //20
        const cols = GridTable.Cols; //10

        for (let y = 0; y < rows; y++) {
            this.cells[y] = [];
            for (let x = 0; x < cols; x++) {
                this.cells[y][x] = new Cell(x * this.cellWidth, y * this.cellHeight, CellStatus.Empty); // 初期値を0に設定
            }
        }
    }

    /**
     * Draw the grid on the canvas.
     */
    public drawGrid() {
        for (const row of this.cells) {
            for (const cell of row) {
                cell.render(this.context);
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
        this.cells.unshift(new Array(GridTable.Rows).fill(0));
    }

    public clearRows(): void {
        for (let row = 0; row < this.cells.length; row++) {
            if (this.isRowFull(row)) {
                this.clearRow(row);
            }
        }
    }
}

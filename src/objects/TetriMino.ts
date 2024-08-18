import { GameObject } from "common/interfaces/GameObject";
import { CellSize } from "enums/GridEnums";
import { Cell, Grid } from "./Grid";

export class TetriMino implements GameObject {
    columnIndex: number;
    rowIndex: number;
    x: number;
    y: number;
    controllable: boolean;
    color: string;
    cells: Cell[];
    observers: Observer[];

    /**
     * Create a new tetrimino.
     * @param column column index, 0-based
     * @param row row index, 0-based
     * @param type
     * @param color string, e.g. "blue" or "#0000ff"
     */
    constructor(
        column: number,
        row: number,
        type: TetriMinoType,
        color: string,
        controllable: boolean = true,
        observers: Observer[] = []
    ) {
        this.columnIndex = column;
        this.rowIndex = row;
        this.x = column * CellSize.Width;
        this.y = row * CellSize.Height;
        this.color = color;
        this.controllable = controllable;
        this.cells = [];
        this.observers = observers;

        const shape = TetriMinoShapes[type];
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] === 1) {
                    this.cells.push(new Cell(col * CellSize.Width, row * CellSize.Height, 1));
                }
            }
        }
    }

    /**
     * update the tetrimino's position and shape.
     * @param column
     * @param row
     * @param type
     * @param color
     * @param controllable
     */
    update(column: number, row: number, type: TetriMinoType, color: string, controllable: boolean = true) {
        this.columnIndex = column;
        this.rowIndex = row;
        this.x = column * CellSize.Width;
        this.y = row * CellSize.Height;
        this.color = color;
        this.controllable = controllable;
        this.cells = [];

        const shape = TetriMinoShapes[type];
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] === 1) {
                    this.cells.push(new Cell(col * CellSize.Width, row * CellSize.Height, 1));
                }
            }
        }
        this.notify();
    }

    subscribe(observer: Observer) {
        this.observers.push(observer);
    }
    unsubscribe(observer: Observer) {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }
    notify() {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    /**
     * Render the tetrimino on the canvas.
     * @param context CanvasRenderingContext2D
     */
    public render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        for (const cell of this.cells) {
            context.fillRect(cell.x + this.x, cell.y + this.y, cell.width, cell.height);
        }
    }

    public moveDown(grid: Grid): void {
        if (this.canMoveDown(grid)) {
            this.y += CellSize.Height;
            this.notify();
        }
    }

    private canMoveDown(grid: Grid): boolean {
        for (const cell of this.cells) {
            const x = this.x + cell.x;
            const y = this.y + cell.y;
            //はみ出したらfalse
            if (y + cell.height >= grid.canvas.height) {
                return false;
            }
        }

        return true;
    }

    public moveLeft(grid: Grid): void {
        if (this.canMoveLeft(grid)) {
            this.x -= CellSize.Width;
            this.notify();
        }
    }
    private canMoveLeft(grid: Grid): boolean {
        for (const cell of this.cells) {
            const x = this.x + cell.x;
            const y = this.y + cell.y;

            if (x - cell.width < 0) {
                return false;
            }
        }

        return true;
    }

    public moveRight(grid: Grid): void {
        if (this.canMoveRight(grid)) {
            this.x += CellSize.Width;
            this.notify();
        }
    }
    private canMoveRight(grid: Grid): boolean {
        for (const cell of this.cells) {
            const x = this.x + cell.x;
            const y = this.y + cell.y;

            if (x + cell.width >= grid.canvas.width) {
                return false;
            }
        }

        return true;
    }
    //TODO: Implement this method
    private canRotate(grid: Grid): boolean {
        return true;
    }
    public rotate(grid: Grid): void {
        if (this.canRotate(grid)) {
            // 回転ロジックをここに実装
            this.notify();
        }
    }
}

/**
 * TetriMinoType is an enum that represents the type of tetrimino.
 */
export enum TetriMinoType {
    I,
    J,
    L,
    O,
    S,
    T,
    Z,
    None,
}
/**
 * TetriMinoShapes is a dictionary that maps TetriMinoType to its shape.
 */
const TetriMinoShapes: {
    [key in TetriMinoType]: number[][];
} = Object.freeze({
    [TetriMinoType.I]: [[1, 1, 1, 1]],
    [TetriMinoType.J]: [
        [1, 0, 0],
        [1, 1, 1],
    ],
    [TetriMinoType.L]: [
        [0, 0, 1],
        [1, 1, 1],
    ],
    [TetriMinoType.O]: [
        [1, 1],
        [1, 1],
    ],
    [TetriMinoType.S]: [
        [0, 1, 1],
        [1, 1, 0],
    ],
    [TetriMinoType.T]: [
        [0, 1, 0],
        [1, 1, 1],
    ],
    [TetriMinoType.Z]: [
        [1, 1, 0],
        [0, 1, 1],
    ],
    [TetriMinoType.None]: [],
});
/**
 * RotateMatrix is an enum that represents the rotation matrix.
 */
const RotateMatrix = Object.freeze({
    clockwise: [
        [0, 1],
        [-1, 0],
    ],
    counterclockwise: [
        [0, -1],
        [1, 0],
    ],
});

import { Cell, Grid } from "./Grid";

export class TetriMino {
    x: number;
    y: number;
    color: string;
    cells: Cell[];

    /**
     * Create a new tetrimino.
     * @param x
     * @param y
     * @param type
     * @param color
     */
    constructor(x: number, y: number, type: TetriMinoType, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.cells = [];

        const shape = TetriMinoShapes[type];
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] === 1) {
                    this.cells.push(new Cell(col * CellSize.Width, row * CellSize.Height, CellSize.Width, CellSize.Height));
                }
            }
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

    canMoveDown(grid: Grid): boolean {
        for (const cell of this.cells) {
            const x = this.x + cell.x;
            const y = this.y + cell.y;

            if (y + cell.height >= grid.canvas.height) {
                return false;
            }
        }

        return true;
    }

    canMoveLeft(grid: Grid): boolean {
        for (const cell of this.cells) {
            const x = this.x + cell.x;
            const y = this.y + cell.y;

            if (x - cell.width < 0) {
                return false;
            }
        }

        return true;
    }

    canMoveRight(grid: Grid): boolean {
        for (const cell of this.cells) {
            const x = this.x + cell.x;
            const y = this.y + cell.y;

            if (x + cell.width >= grid.canvas.width) {
                return false;
            }
        }

        return true;
    }

    canRotate(grid: Grid): boolean {
        return true;
    }
}
/**
 * GridSize is an enum that represents the size of the grid. Follows the guideline of Tetris.
 */
export enum GridSize {
    Rows = 20, // 20 rows, 30px * 20 = 600px
    Cols = 10,
}
/**
 * CellSize is an enum that represents the size of a each cell.
 */
export enum CellSize {
    Width = 30, // 30px
    Height = 30,
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
} = {
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
};
/**
 * RotateMatrix is an enum that represents the rotation matrix.
 */
const RotateMatrix = {
    clockwise: [
        [0, 1],
        [-1, 0],
    ],
    counterclockwise: [
        [0, -1],
        [1, 0],
    ],
};

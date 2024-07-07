/**
 * GridSize is an enum that represents the size of the grid. Follows the guideline of Tetris.
 */
enum GridSize {
    Rows = 20, // 20 rows, 30px * 20 = 600px
    Cols = 10, // 10 columns, 30px * 10 = 300px
}

/**
 * CellSize is an enum that represents the size of a each cell.
 */
enum CellSize {
    Width = 30, // 30px
    Height = 30, // 30px
}

/**
 * TetriMinoType is an enum that represents the type of tetrimino.
 */
enum TetriMinoType {
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
const TetriMinoShapes: { [key in TetriMinoType]: number[][] } = {
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

/**
 * Cell class represents a single cell in the grid.
 */
class Cell {
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
class Grid {
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

    isGameOver(tetrimino: TetriMino): boolean {
        return false;
    }

    isRowFull(row: number): boolean {
        for (const cell of this.cells[row]) {
            if (cell.width === 0) {
                return false;
            }
        }
        return true;
    }

    clearRow(row: number): void {
        this.cells.splice(row, 1);
        this.cells.unshift(new Array(GridSize.Cols).fill(0));
    }

    clearRows(): void {
        for (let row = 0; row < this.cells.length; row++) {
            if (this.isRowFull(row)) {
                this.clearRow(row);
            }
        }
    }
}

class TetriMino {
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

// Main
(function () {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const cellWidth = CellSize.Width;
    const cellHeight = CellSize.Height;
    const grid = new Grid(canvas, cellWidth, cellHeight);
    grid.drawGrid();

    const tetriMino = new TetriMino(30, 30, TetriMinoType.T, "blue");
    tetriMino.render(grid.context);
})();

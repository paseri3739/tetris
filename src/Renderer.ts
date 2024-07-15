import { Grid } from "./Grid.js";

export class Renderer implements Observer {
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private readonly grid: Grid;

    constructor(canvas: HTMLCanvasElement, grid: Grid) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d")!;
        this.grid = grid;
    }

    update() {
        this.clearCanvas();
        this.grid.drawGrid();
    }

    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

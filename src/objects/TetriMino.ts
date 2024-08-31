import { InputSystem } from "../common/input_system/InputSystem";
import { DynamicGameObject, GameObjectState } from "../common/interfaces/DynamicGameObject";
import { GameComponent } from "../common/interfaces/GameComponent";
import { Cell } from "./Cell";
import { GridMovementComponent } from "./components/GridMovementComponent";
import { RotationComponent } from "./components/RotationComponent";
import { Grid } from "./Grid";

export class TetriMino implements DynamicGameObject {
    private x: number;
    private y: number;
    private grid: Grid;
    private state: GameObjectState;
    private components: GameComponent[];
    private readonly type: TetriMinoType;
    private shape: number[][];
    private readonly movementComponent: GridMovementComponent;
    private readonly rotationComponent: RotationComponent;
    private readonly colors: string[] = ["red", "blue", "green"];
    private currentColor: string;

    private dropInterval: number = 1000; // 1秒ごとに1マス落下
    private lastDropTime: number = 0;
    private rotationInterval: number = 200; // 回転可能な間隔（ミリ秒）
    private lastRotationTime: number = 0; // 最後に回転を行った時刻

    constructor(
        x: number,
        y: number,
        state: GameObjectState = GameObjectState.Active,
        grid: Grid,
        components: GameComponent[] = [],
        type: TetriMinoType,
        movementComponent: GridMovementComponent,
        rotationComponent: RotationComponent
    ) {
        this.x = x;
        this.y = y;
        this.state = state;
        this.grid = grid;
        this.components = components;
        this.type = type;
        this.shape = TetriMinoShapes[this.type];
        this.movementComponent = movementComponent;
        this.movementComponent.setOwner(this);
        this.rotationComponent = rotationComponent;
        this.rotationComponent.setOwner(this);
        this.currentColor = this.getRandomColor();
    }
    setX(x: number): void {
        this.x = x;
    }
    setY(y: number): void {
        this.y = y;
    }

    private getRandomColor(): string {
        const randomIndex = Math.floor(Math.random() * this.colors.length);
        return this.colors[randomIndex];
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    updateComponents(deltaTime: number): void {
        this.components.forEach((component) => component.update(deltaTime));
    }

    getType(): TetriMinoType {
        return this.type;
    }

    getShape(): number[][] {
        return this.shape;
    }

    setShape(shape: number[][]): void {
        this.shape = shape;
    }

    setState(state: GameObjectState): void {
        this.state = state;
    }

    getState(): GameObjectState {
        return this.state;
    }

    addComponent(component: GameComponent): void {
        this.components.push(component);
    }

    removeComponent(component: GameComponent): void {
        this.components = this.components.filter((c) => c !== component);
    }

    update(deltaTime: number): void {
        if (this.state !== GameObjectState.Active) {
            return;
        }
        if (this.movementComponent.isOufOfBoundary()) {
            return;
        }
        const currentTime = Date.now();
        if (currentTime - this.lastDropTime >= this.dropInterval) {
            this.y += 1 * Cell.cellHeight; // 1秒ごとに1マス落下
            this.lastDropTime = currentTime;
        }
        // 更新を行う
        this.movementComponent.update(deltaTime);
        // 回転可否はコンポーネント内のフラグにより自動で判断される
        this.rotationComponent.update(deltaTime);
        this.components.forEach((component) => component.update(deltaTime));
        this.mapToGrid();
    }

    render(context: CanvasRenderingContext2D): void {
        const shape = this.shape;
        context.fillStyle = this.currentColor; // ランダムに選ばれた色を使用

        shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    context.fillRect(this.x + x * Cell.cellWidth, this.y + y * Cell.cellHeight, Cell.cellWidth, Cell.cellHeight);
                }
            });
        });
    }

    processInput(input: InputSystem): void {
        input.updateState();
        const currentTime = Date.now();

        if (input.isKeyPressed("ArrowLeft")) {
            this.movementComponent.setDirection(-1, 0);
        } else if (input.isKeyPressed("ArrowRight")) {
            this.movementComponent.setDirection(1, 0);
        }

        if (input.isKeyPressed("ArrowDown")) {
            this.dropInterval = 500; // 下矢印キーで落下速度を2倍に
            this.movementComponent.setDirection(0, 1);
        } else {
            this.dropInterval = 1000; // 通常の落下速度に戻す
        }

        if (currentTime - this.lastRotationTime >= this.rotationInterval) {
            if (input.isKeyPressed("z")) {
                this.rotationComponent.setClockwise(false);
                this.lastRotationTime = currentTime; // 最後に回転した時刻を更新
            }

            if (input.isKeyPressed("x")) {
                this.rotationComponent.setClockwise(true);
                this.lastRotationTime = currentTime; // 最後に回転した時刻を更新
            }
        }
    }

    mapToGrid(): void {
        this.grid.mapTetriMinoToGrid(this);
    }

    getColumnIndex(): number {
        return this.grid.getColumnIndexFromX(this.x);
    }

    getRowIndex(): number {
        return this.grid.getRowIndexFromY(this.y);
    }

    /**
     * テトリミノ行列内のセルが1であるインデックスの組を取得します。
     * グリッド内の座標に変換されます。
     */
    getFilledCellIndices(): { x: number; y: number }[] {
        const filledCells: { x: number; y: number }[] = [];
        this.shape.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === 1) {
                    const gridX = this.x + colIndex * Cell.cellWidth;
                    const gridY = this.y + rowIndex * Cell.cellHeight;
                    filledCells.push({
                        x: this.grid.getColumnIndexFromX(gridX),
                        y: this.grid.getRowIndexFromY(gridY),
                    });
                }
            });
        });
        return filledCells;
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
export const TetriMinoShapes: {
    [key in TetriMinoType]: number[][];
} = Object.freeze({
    [TetriMinoType.I]: [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
    ],
    [TetriMinoType.J]: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [TetriMinoType.L]: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [TetriMinoType.O]: [
        [0, 1, 1],
        [0, 1, 1],
        [0, 0, 0],
    ],
    [TetriMinoType.S]: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    [TetriMinoType.T]: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [TetriMinoType.Z]: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    [TetriMinoType.None]: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
});

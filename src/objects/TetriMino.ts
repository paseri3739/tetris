import { InputSystem } from "../common/input_system/InputSystem.js";
import { DynamicGameObject, GameObjectState } from "../common/interfaces/DynamicGameObject.js";
import { GameComponent } from "../common/interfaces/GameComponent.js";
import { GAME_CONFIG } from "../game_config.js";
import { GridMovementComponent } from "./components/GridMovementComponent.js";
import { RotationComponent } from "./components/RotationComponent.js";
import { Grid } from "./Grid.js";

export class TetriMino implements DynamicGameObject {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    grid: Grid;
    state: GameObjectState;
    components: GameComponent[];
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
        velocityX: number = 0,
        velocityY: number = 1, // デフォルトで下方向の速度を1に設定
        state: GameObjectState = GameObjectState.Active,
        grid: Grid,
        components: GameComponent[] = [],
        type: TetriMinoType,
        movementComponent: GridMovementComponent,
        rotationComponent: RotationComponent
    ) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
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
            this.y += 1 * GAME_CONFIG.cell.height; // 1秒ごとに1マス落下
            this.lastDropTime = currentTime;
        }
        this.movementComponent.update(deltaTime);
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
                    context.fillRect(
                        this.x + x * GAME_CONFIG.cell.width,
                        this.y + y * GAME_CONFIG.cell.height,
                        GAME_CONFIG.cell.width,
                        GAME_CONFIG.cell.height
                    );
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

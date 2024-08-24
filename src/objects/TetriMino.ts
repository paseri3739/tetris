import { InputSystem } from "../common/input_system/InputSystem.js";
import { DynamicGameObject, GameObjectState } from "../common/interfaces/DynamicGameObject.js";
import { GameComponent } from "../common/interfaces/GameComponent.js";
import { CellSize } from "./Cell.js";
import { MovementComponent } from "./components/MovementComponent.js";
import { RotationComponent } from "./components/RotationComponent.js";

export class TetriMino implements DynamicGameObject {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    state: GameObjectState;
    components: GameComponent[];
    private readonly type: TetriMinoType;
    private shape: number[][];
    private readonly movementComponent: MovementComponent;
    private readonly rotationComponent: RotationComponent;

    private dropInterval: number = 1000; // 1秒ごとに1マス落下
    private lastDropTime: number = 0;

    constructor(
        x: number,
        y: number,
        velocityX: number = 0,
        velocityY: number = 1, // デフォルトで下方向の速度を1に設定
        state: GameObjectState = GameObjectState.Active,
        components: GameComponent[] = [],
        type: TetriMinoType,
        movementComponent: MovementComponent,
        rotationComponent: RotationComponent
    ) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.state = state;
        this.components = components;
        this.type = type;
        this.shape = TetriMinoShapes[this.type];
        this.movementComponent = movementComponent;
        this.movementComponent.setOwner(this);
        this.rotationComponent = rotationComponent;
        this.rotationComponent.setOwner(this);
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
        const currentTime = Date.now();
        if (currentTime - this.lastDropTime >= this.dropInterval) {
            this.y += 1 * CellSize.Height; // 1秒ごとに1マス落下
            this.lastDropTime = currentTime;
        }

        this.movementComponent.update(deltaTime);
        // this.rotationComponent.update(deltaTime);

        this.components.forEach((component) => component.update(deltaTime));
    }

    render(context: CanvasRenderingContext2D): void {
        const shape = this.shape;
        context.fillStyle = "blue"; // テトリミノの色を青に設定

        shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    context.fillRect(this.x + x * CellSize.Width, this.y + y * CellSize.Height, CellSize.Width, CellSize.Height);
                }
            });
        });
    }

    processInput(input: InputSystem): void {
        input.updateState();

        if (input.isKeyPressed("ArrowLeft")) {
            this.x -= 1; // 左矢印キーで1マス左に移動
        } else if (input.isKeyPressed("ArrowRight")) {
            this.x += 1; // 右矢印キーで1マス右に移動
        }

        if (input.isKeyPressed("ArrowDown")) {
            this.dropInterval = 500; // 下矢印キーで落下速度を2倍に
        } else {
            this.dropInterval = 1000; // 通常の落下速度に戻す
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
export const TetriMinoShapes: {
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
export const RotateMatrix = Object.freeze({
    clockwise: [
        [0, 1],
        [-1, 0],
    ],
    counterclockwise: [
        [0, -1],
        [1, 0],
    ],
});

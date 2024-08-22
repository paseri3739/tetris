import { InputSystem } from "../common/input_system/InputSystem.js";
import { DynamicGameObject, GameObjectState } from "../common/interfaces/DynamicGameObject.js";
import { GameComponent } from "../common/interfaces/GameComponent.js";
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

    constructor(
        x: number,
        y: number,
        velocityX: number = 0,
        velocityY: number = 0,
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
        this.movementComponent.update(deltaTime);
        this.rotationComponent.update(deltaTime);

        // 他のコンポーネントの更新もここで呼び出す
        this.components.forEach((component) => component.update(deltaTime));
    }

    render(context: CanvasRenderingContext2D): void {
        const shape = this.shape;
        shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    context.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    processInput(input: InputSystem): void {
        // Input processing logic, if any, can go here
        input.updateState();
        // キー入力による移動処理
        if (input.isKeyPressed("ArrowLeft")) {
            this.movementComponent.setDirection(-1, 0);
        } else if (input.isKeyPressed("ArrowRight")) {
            this.movementComponent.setDirection(1, 0);
        } else if (input.isKeyPressed("ArrowDown")) {
            this.movementComponent.setDirection(0, 1);
        } else if (input.isKeyPressed("ArrowUp")) {
            this.rotationComponent.setClockwise(true);
        } else if (input.isKeyPressed("Shift")) {
            this.rotationComponent.setClockwise(false);
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

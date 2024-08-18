import { InputSystem } from "common/input_system/InputSystem.js";
import { DynamicGameObject, GameObjectState } from "common/interfaces/DynamicGameObject.js";
import { GameComponent } from "common/interfaces/GameComponent.js";
import { BoundaryCheckComponent } from "./components/BoundaryCheckComponent.js";
import { MovementComponent } from "./components/MovementComponent.js";
import { PositionComponent } from "./components/PositionComponent.js";
import { RotationComponent } from "./components/RotationComponent.js";

export class TetriMino implements DynamicGameObject {
    x: number;
    y: number;
    state: GameObjectState;
    components: GameComponent[];
    private readonly type: TetriMinoType;
    private readonly movementComponent: MovementComponent;
    private readonly positionComponent: PositionComponent;
    private readonly rotationComponent: RotationComponent;
    private readonly boundaryCheckComponent: BoundaryCheckComponent;

    constructor(
        x: number,
        y: number,
        state: GameObjectState = GameObjectState.Active,
        components: GameComponent[] = [],
        type: TetriMinoType,
        movementComponent: MovementComponent,
        positionComponent: PositionComponent,
        rotationComponent: RotationComponent,
        boundaryCheckComponent: BoundaryCheckComponent
    ) {
        this.x = x;
        this.y = y;
        this.state = state;
        this.components = components;
        this.type = type;
        this.movementComponent = movementComponent;
        this.positionComponent = positionComponent;
        this.rotationComponent = rotationComponent;
        this.boundaryCheckComponent = boundaryCheckComponent;
    }

    getType(): TetriMinoType {
        return this.type;
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

    update(deltaTime: number, input: InputSystem): void {
        const direction = { x: 0, y: 0 };
        if (input.isKeyPressed("ArrowLeft")) direction.x = -1;
        if (input.isKeyPressed("ArrowRight")) direction.x = 1;
        if (input.isKeyPressed("ArrowDown")) direction.y = 1;

        this.movementComponent.update(deltaTime, direction);
        this.rotationComponent.update(deltaTime, input.isKeyPressed("ArrowUp"));
        this.boundaryCheckComponent.update(deltaTime);

        // 他のコンポーネントの更新もここで呼び出す
        this.components.forEach((component) => component.update(deltaTime));
    }

    render(context: CanvasRenderingContext2D): void {
        const shape = TetriMinoShapes[this.type];
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

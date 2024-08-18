import { MovementComponent } from "././components/MovementComponent.js";
import { PositionComponent } from "././components/PositionComponent.js";
import { InputSystem } from "./common/input_system/InputSystem.js";
import { DynamicGameObject, GameObjectState } from "./common/interfaces/DynamicGameObject.js";
import { GameComponent } from "./common/interfaces/GameComponent.js";

export class TetriMino implements DynamicGameObject {
    x: number;
    y: number;
    state: GameObjectState;
    components: GameComponent[];
    private readonly type: TetriMinoType;
    private readonly movementComponent: MovementComponent;
    private readonly positionComponent: PositionComponent;

    constructor(
        x: number,
        y: number,
        state: GameObjectState = GameObjectState.Active,
        components: GameComponent[] = [],
        type: TetriMinoType,
        movementComponent: MovementComponent,
        positionComponent: PositionComponent
    ) {
        this.x = x;
        this.y = y;
        this.state = state;
        this.components = components;
        this.type = type;
        this.movementComponent = movementComponent;
        this.positionComponent = positionComponent;
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

    update(deltaTime: number, ...args: any[]): void {
        throw new Error("Method not implemented.");
    }
    render(context: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
    processInput(input: InputSystem): void {
        throw new Error("Method not implemented.");
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

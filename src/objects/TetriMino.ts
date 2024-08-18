import { InputSystem } from "common/input_system/InputSystem";
import { GameObject } from "common/interfaces/GameObject";
import { MovementComponent } from "./components/MovementComponent";
import { PositionComponent } from "./components/PositionComponent";

export class TetriMino implements GameObject {
    private type: TetriMinoType;
    private movementComponent: MovementComponent;
    private positionComponent: PositionComponent;

    constructor(type: TetriMinoType, movementComponent: MovementComponent, positionComponent: PositionComponent) {
        this.type = type;
        this.movementComponent = movementComponent;
        this.positionComponent = positionComponent;
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

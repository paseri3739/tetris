import { DynamicGameObject } from "../../common/interfaces/DynamicGameObject.js";
import { GameComponent } from "../../common/interfaces/GameComponent.js";

export class RotationComponent implements GameComponent {
    owner!: DynamicGameObject & { getShape: () => number[][]; setShape: (shape: number[][]) => void };
    isClockwise: boolean;
    isUpdatable = false;

    constructor(isClockwise: boolean = true) {
        this.isClockwise = isClockwise;
    }

    update(deltaTime: number): void {
        if (this.owner && this.isUpdatable) {
            const currentShape = this.owner.getShape();
            const rotatedShape = this.rotateTetriMino(currentShape, this.isClockwise ? "clockwise" : "counterclockwise");
            this.owner.setShape(rotatedShape);
            this.setUpdatable(false);
        }
    }

    setOwner(owner: DynamicGameObject & { getShape: () => number[][]; setShape: (shape: number[][]) => void }): void {
        this.owner = owner;
    }

    setClockwise(isClockwise: boolean): void {
        this.isClockwise = isClockwise;
    }

    setUpdatable(isUpdatable: boolean): void {
        this.isUpdatable = isUpdatable;
    }

    /**
     * Rotates the TetriMino shape by the specified direction.
     * @param shape - The TetriMino shape to rotate.
     * @param direction - The direction to rotate ('clockwise' or 'counterclockwise').
     * @returns The rotated TetriMino shape.
     */
    private rotateTetriMino(shape: number[][], direction: "clockwise" | "counterclockwise"): number[][] {
        const rotatedShape = shape.map((_, index) => shape.map((row) => row[index]));
        if (direction === "clockwise") {
            return rotatedShape.map((row) => row.reverse());
        } else {
            return rotatedShape.reverse();
        }
    }
}

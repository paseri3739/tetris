import { DynamicGameObject } from "../../common/interfaces/DynamicGameObject";
import { GameComponent } from "../../common/interfaces/GameComponent";

export class RotationComponent implements GameComponent {
    private owner!: DynamicGameObject & { getShape: () => number[][]; setShape: (shape: number[][]) => void };
    private isClockwise: boolean;
    private isUpdatable = false;

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

    /**
     * set rotation direction and make the component updatable
     * @param isClockwise
     */
    setClockwise(isClockwise: boolean): void {
        this.isClockwise = isClockwise;
        this.setUpdatable(true);
    }

    private setUpdatable(isUpdatable: boolean): void {
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

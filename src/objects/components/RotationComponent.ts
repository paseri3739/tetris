import { DynamicGameObject } from "../../common/interfaces/DynamicGameObject.js";
import { GameComponent } from "../../common/interfaces/GameComponent.js";
export class RotationComponent implements GameComponent {
    owner!: DynamicGameObject & { getShape: () => number[][]; setShape: (shape: number[][]) => void };
    isClockwise: boolean;

    constructor(isClockwise: boolean = true) {
        this.isClockwise = isClockwise;
    }

    update(deltaTime: number): void {
        if (this.owner) {
            const currentShape = this.owner.getShape();
            const rotatedShape = this.rotateTetriMino(currentShape, this.isClockwise ? "clockwise" : "counterclockwise");
            this.owner.setShape(rotatedShape);
        }
    }

    setOwner(owner: DynamicGameObject & { getShape: () => number[][]; setShape: (shape: number[][]) => void }): void {
        this.owner = owner;
    }

    setClockwise(isClockwise: boolean): void {
        this.isClockwise = isClockwise;
    }

    /**
     * Rotates the TetriMino shape by the specified direction.
     * @param shape - The TetriMino shape to rotate.
     * @param direction - The direction to rotate ('clockwise' or 'counterclockwise').
     * @returns The rotated TetriMino shape.
     */
    private rotateTetriMino(shape: number[][], direction: "clockwise" | "counterclockwise"): number[][] {
        const rotationMatrix = this.getRotationMatrix(direction);
        return this.rotate(shape, rotationMatrix);
    }

    /**
     * Gets the rotation matrix for the specified direction.
     * @param direction - The rotation direction.
     * @returns The rotation matrix.
     */
    private getRotationMatrix(direction: "clockwise" | "counterclockwise"): number[][] {
        if (direction === "clockwise") {
            return [
                [0, 1],
                [-1, 0],
            ];
        } else {
            return [
                [0, -1],
                [1, 0],
            ];
        }
    }

    /**
     * Rotates a matrix by the given rotation matrix.
     * @param matrix - The matrix to rotate.
     * @param rotationMatrix - The rotation matrix to apply.
     * @returns The rotated matrix.
     */
    private rotate(matrix: number[][], rotationMatrix: number[][]): number[][] {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const rotatedMatrix: number[][] = Array.from({ length: cols }, () => Array(rows).fill(0));

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const newI = j * rotationMatrix[0][0] + i * rotationMatrix[0][1];
                const newJ = j * rotationMatrix[1][0] + i * rotationMatrix[1][1];

                // 新しいインデックスが範囲内か確認
                if (newI >= 0 && newI < cols && newJ >= 0 && newJ < rows) {
                    rotatedMatrix[newI][newJ] = matrix[i][j];
                }
            }
        }

        return rotatedMatrix;
    }
}

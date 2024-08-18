import { GameComponent } from "common/interfaces/GameComponent.js";
import { RotateMatrix, TetriMino, TetriMinoShapes } from "objects/TetriMino.js";
export class RotationComponent implements GameComponent {
    owner: TetriMino;

    constructor(owner: TetriMino) {
        this.owner = owner;
    }

    updateOwner(deltaTime: number, rotateClockwise: boolean): void {
        const matrix = rotateClockwise ? RotateMatrix.clockwise : RotateMatrix.counterclockwise;
        const shape = TetriMinoShapes[this.owner.getType()];
        const rotatedShape = this.rotateShape(shape, matrix);
        // Here, you would add logic to check for collisions or out-of-bounds situations
        // For now, assume that the rotation is always valid
        TetriMinoShapes[this.owner.getType()] = rotatedShape;
    }

    private rotateShape(shape: number[][], matrix: number[][]): number[][] {
        return shape.map((row) => row.map((_, i) => row.map((_, j) => shape[j][i]).reduce((a, b) => a + b)));
    }
}

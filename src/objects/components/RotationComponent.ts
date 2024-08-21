import { DynamicGameObject } from "../../common/interfaces/DynamicGameObject.js";
import { GameComponent } from "../../common/interfaces/GameComponent.js";
import { RotateMatrix, TetriMino, TetriMinoShapes } from "../../objects/TetriMino.js";
export class RotationComponent implements GameComponent {
    owner!: TetriMino;

    constructor() {}
    setOwner(owner: DynamicGameObject): void {
        this.owner = owner as TetriMino;
    }

    updateOwner(deltaTime: number): void {
        const matrix = RotateMatrix.clockwise;
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

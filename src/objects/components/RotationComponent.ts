import { DynamicGameObject } from "../../common/interfaces/DynamicGameObject.js";
import { GameComponent } from "../../common/interfaces/GameComponent.js";
import { TetriMino } from "../../objects/TetriMino.js";
export class RotationComponent implements GameComponent {
    owner!: TetriMino;

    constructor() {}
    update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }
    setOwner(owner: DynamicGameObject): void {
        this.owner = owner as TetriMino;
    }

    private rotateShape(shape: number[][], matrix: number[][]): number[][] {
        return shape.map((row) => row.map((_, i) => row.map((_, j) => shape[j][i]).reduce((a, b) => a + b)));
    }
}

import { DynamicGameObject } from "../../common/interfaces/DynamicGameObject.js";
import { GameComponent } from "../../common/interfaces/GameComponent.js";
import { TetriMino } from "../../objects/TetriMino.js";
export class RotationComponent implements GameComponent {
    owner!: TetriMino;
    isClockwise: boolean;

    constructor() {
        this.isClockwise = true;
    }
    update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }
    setOwner(owner: DynamicGameObject): void {
        this.owner = owner as TetriMino;
    }
}

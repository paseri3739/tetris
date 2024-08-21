import { DynamicGameObject } from "../../common/interfaces/DynamicGameObject.js";
import { GameComponent } from "../../common/interfaces/GameComponent.js";
import { TetriMino } from "../../objects/TetriMino.js";

export class BoundaryCheckComponent implements GameComponent {
    owner!: TetriMino;
    private readonly gameWidth: number;
    private readonly gameHeight: number;

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }
    update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }
    setOwner(owner: DynamicGameObject): void {
        this.owner = owner as TetriMino;
    }
}

import { DynamicGameObject, GameObjectState } from "../../common/interfaces/DynamicGameObject";
import { GameComponent } from "../../common/interfaces/GameComponent.js";
import { TetriMino } from "../../objects/TetriMino";

export class BoundaryCheckComponent implements GameComponent {
    owner!: TetriMino;
    private readonly gameWidth: number;
    private readonly gameHeight: number;

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }
    setOwner(owner: DynamicGameObject): void {
        this.owner = owner as TetriMino;
    }

    updateOwner(deltaTime: number): void {
        const position = this.owner.getPositionComponent().getPosition();
        if (position.x < 0 || position.x >= this.gameWidth || position.y < 0 || position.y >= this.gameHeight) {
            this.owner.setState(GameObjectState.Inactive);
        }
    }
}

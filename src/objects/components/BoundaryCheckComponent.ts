import { DynamicGameObject } from "../../common/interfaces/DynamicGameObject.js";
import { GameComponent } from "../../common/interfaces/GameComponent.js";

export class BoundaryCheckComponent implements GameComponent {
    owner!: DynamicGameObject;
    private isBoundary: boolean;
    private readonly gameWidth: number;
    private readonly gameHeight: number;

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.isBoundary = false;
    }
    update(deltaTime: number): void {}
    setOwner(owner: DynamicGameObject): void {
        this.owner = owner;
    }

    isOutOfBoundary(): boolean {
        return this.isBoundary;
    }
}

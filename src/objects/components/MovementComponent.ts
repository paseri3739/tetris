import { DynamicGameObject } from "../../common/interfaces/DynamicGameObject.js";
import { GameComponent } from "../../common/interfaces/GameComponent.js";

export class MovementComponent implements GameComponent {
    owner!: DynamicGameObject;
    directionX: number;
    directionY: number;

    constructor() {
        this.directionX = 0;
        this.directionY = 0;
    }
    update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }
    setOwner(owner: DynamicGameObject): void {
        this.owner = owner;
    }

    setDirection(directionX: number, directionY: number): void {
        this.directionX = directionX;
        this.directionY = directionY;
    }
}

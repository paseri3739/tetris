import { DynamicGameObject } from "../../common/interfaces/DynamicGameObject.js";
import { GameComponent } from "../../common/interfaces/GameComponent.js";

export class MovementComponent implements GameComponent {
    owner!: DynamicGameObject;

    constructor() {}
    update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }
    setOwner(owner: DynamicGameObject): void {
        this.owner = owner;
    }

    setDirection(direction: { x: number; y: number }): void {
        this.owner.x += direction.x;
        this.owner.y += direction.y;
    }
}

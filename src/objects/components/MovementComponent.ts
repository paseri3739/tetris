import { DynamicGameObject } from "../../common/interfaces/DynamicGameObject.js";
import { GameComponent } from "../../common/interfaces/GameComponent.js";

export class MovementComponent implements GameComponent {
    owner!: DynamicGameObject;

    constructor() {}
    setOwner(owner: DynamicGameObject): void {
        this.owner = owner;
    }

    updateOwner(deltaTime: number, direction: { x: number; y: number }): void {
        this.owner.x += direction.x;
        this.owner.y += direction.y;
    }
}

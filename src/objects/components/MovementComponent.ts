import { DynamicGameObject } from "common/interfaces/DynamicGameObject.js";
import { GameComponent } from "common/interfaces/GameComponent.js";

export class MovementComponent implements GameComponent {
    owner: DynamicGameObject;

    constructor(owner: DynamicGameObject) {
        this.owner = owner;
    }

    update(deltaTime: number, direction: { x: number; y: number }): void {
        this.owner.x += direction.x;
        this.owner.y += direction.y;
    }
}

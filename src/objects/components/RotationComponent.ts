import { DynamicGameObject } from "../../common/interfaces/DynamicGameObject.js";
import { GameComponent } from "../../common/interfaces/GameComponent.js";
export class RotationComponent implements GameComponent {
    owner!: DynamicGameObject;
    isClockwise: boolean;

    constructor() {
        this.isClockwise = true;
    }
    update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }
    setOwner(owner: DynamicGameObject): void {
        this.owner = owner;
    }
}

import { DynamicGameObject } from "./common/interfaces/DynamicGameObject.js";
import { GameComponent } from "./common/interfaces/GameComponent.js";

export class PositionComponent implements GameComponent {
    owner: DynamicGameObject;
    x: number = 0;
    y: number = 0;

    constructor(owner: DynamicGameObject) {
        this.owner = owner;
    }

    setPotision(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getPotision() {
        return { x: this.x, y: this.y };
    }

    update(deltaTime: number, ...args: any[]): void {
        // throw new Error("Method not implemented.");
    }
}

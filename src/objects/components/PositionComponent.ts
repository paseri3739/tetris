import { DynamicGameObject } from "common/interfaces/DynamicGameObject.js";
import { GameComponent } from "common/interfaces/GameComponent.js";

export class PositionComponent implements GameComponent {
    owner: DynamicGameObject;

    constructor(owner: DynamicGameObject) {
        this.owner = owner;
    }

    updateOwner(deltaTime: number): void {
        // 位置は外部で直接変更されるので、ここでは特に処理しない
    }

    getPosition(): { x: number; y: number } {
        return { x: this.owner.x, y: this.owner.y };
    }

    setPosition(x: number, y: number): void {
        this.owner.x = x;
        this.owner.y = y;
    }
}

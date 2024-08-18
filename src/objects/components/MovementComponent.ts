import { DynamicGameObject } from "common/interfaces/DynamicGameObject";
import { GameComponent } from "common/interfaces/GameComponent.js";

export class MovementComponent implements GameComponent {
    owner: DynamicGameObject;
    speed: number;
    direction: { x: number; y: number };

    constructor(owner: DynamicGameObject, speed = 1) {
        this.owner = owner;
        this.speed = speed;
        this.direction = { x: 0, y: 0 };
    }

    setDirection(x: number, y: number) {
        this.direction = { x: x, y: y };
    }

    updatePosition(position: { x: number; y: number }) {
        position.x += this.direction.x * this.speed;
        position.y += this.direction.y * this.speed;
    }

    update(deltaTime: number, ...args: any[]): void {}
}

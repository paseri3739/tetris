import { GameComponent } from "common/interfaces/GameComponent";
import { GameObject } from "common/interfaces/GameObject";

export class PositionComponent implements GameComponent {
    owner: GameObject;
    x: number = 0;
    y: number = 0;

    constructor(owner: GameObject) {
        this.owner = owner;
    }

    setPotision(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getPotision() {
        return { x: this.x, y: this.y };
    }
}

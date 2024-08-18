import { DynamicGameObject } from "./DynamicGameObject.js";

export interface GameComponent {
    owner: DynamicGameObject;
    update(deltaTime: number, ...args: any[]): void;
}

import { DynamicGameObject } from "./DynamicGameObject.js";

export interface GameComponent {
    owner: DynamicGameObject;
    updateOwner(deltaTime: number, ...args: any[]): void;
}

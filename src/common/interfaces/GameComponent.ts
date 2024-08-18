import { DynamicGameObject } from "./DynamicGameObject.js";

export interface GameComponent {
    owner: DynamicGameObject;
    setOwner(owner: DynamicGameObject): void;
    updateOwner(deltaTime: number, ...args: any[]): void;
}

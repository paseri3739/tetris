import { DynamicGameObject } from "./DynamicGameObject.js";

export interface GameComponent {
    owner: DynamicGameObject;
    setOwner(owner: DynamicGameObject): void;
    update(deltaTime: number): void;
}

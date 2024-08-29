import { DynamicGameObject } from "./DynamicGameObject";

export interface GameComponent {
    owner: DynamicGameObject;
    setOwner(owner: DynamicGameObject): void;
    update(deltaTime: number): void;
}

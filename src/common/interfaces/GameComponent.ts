import { DynamicGameObject } from "./DynamicGameObject";

export interface GameComponent {
    setOwner(owner: DynamicGameObject): void;
    update(deltaTime: number): void;
}

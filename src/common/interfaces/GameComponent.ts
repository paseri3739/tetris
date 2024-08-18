import { DynamicGameObject } from "./DynamicGameObject";

export interface GameComponent {
    owner: DynamicGameObject;
    update(deltaTime: number, ...args: any[]): void;
}

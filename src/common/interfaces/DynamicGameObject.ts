import { InputSystem } from "input_system/InputSystem";
import { GameComponent } from "./GameComponent";

export enum GameObjectState {
    Active,
    Inactive,
    Destroyed,
}

export interface DynamicGameObject {
    state: GameObjectState;
    components: GameComponent[];
    setState(state: GameObjectState): void;
    getState(): GameObjectState;
    update(deltaTime: number, ...args: any[]): void;
    render(context: CanvasRenderingContext2D): void;
    processInput(input: InputSystem): void;
    addComponent(component: GameComponent): void;
    removeComponent(component: GameComponent): void;
}

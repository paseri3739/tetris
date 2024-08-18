import { GameComponent } from "././GameComponent.js";
import { GameObject } from "././GameObject.js";
import { InputSystem } from "./input_system/InputSystem.js";

export enum GameObjectState {
    Active,
    Inactive,
    Destroyed,
}

export interface DynamicGameObject extends GameObject {
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

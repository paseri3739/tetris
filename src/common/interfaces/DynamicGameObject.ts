import { InputSystem } from "../../common/input_system/InputSystem.js";
import { GameComponent } from "./GameComponent.js";
import { GameObject } from "./GameObject.js";
import { Updatable } from "./Updatable.js";

export enum GameObjectState {
    Active,
    Inactive,
    Destroyed,
}

export interface DynamicGameObject extends GameObject, Updatable {
    velocityX: number;
    velocityY: number;
    state: GameObjectState;
    components: GameComponent[];
    setState(state: GameObjectState): void;
    getState(): GameObjectState;
    update(deltaTime: number): void;
    updateComponents(deltaTime: number): void;
    render(context: CanvasRenderingContext2D): void;
    processInput(input: InputSystem): void;
    addComponent(component: GameComponent): void;
    removeComponent(component: GameComponent): void;
}

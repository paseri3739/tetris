import { InputSystem } from "../../common/input_system/InputSystem";
import { GameComponent } from "./GameComponent";
import { GameObject } from "./GameObject";
import { Updatable } from "./Updatable";

export enum GameObjectState {
    Active,
    Inactive,
    Destroyed,
}

export interface DynamicGameObject extends GameObject, Updatable {
    setX(x: number): void;
    setY(y: number): void;
    setState(state: GameObjectState): void;
    getState(): GameObjectState;
    update(deltaTime: number): void;
    updateComponents(deltaTime: number): void;
    render(context: CanvasRenderingContext2D): void;
    processInput(input: InputSystem): void;
    addComponent(component: GameComponent): void;
    removeComponent(component: GameComponent): void;
}

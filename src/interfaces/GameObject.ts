import { InputSystem } from "InputSystem";
import { GameComponent } from "./GameComponent";

export interface GameObject {
    update(deltaTime: number, ...args: any[]): void;
    render(context: CanvasRenderingContext2D): void;
    processInput(input: InputSystem): void;
    addComponent(component: GameComponent): void;
    removeComponent(component: GameComponent): void;
}

import { InputSystem } from "input_system/InputSystem";
import { GameComponent } from "./GameComponent";

export interface GameObject {
    update(deltaTime: number, ...args: any[]): void;
    render(context: CanvasRenderingContext2D): void;
    processInput(input: InputSystem): void;
    addComponent(component: GameComponent): void;
    removeComponent(component: GameComponent): void;
}

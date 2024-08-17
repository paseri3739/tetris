import { GameComponent } from "./GameComponent";

export interface GameObject {
    update(deltaTime: number, ...args: any[]): void;
    render(context: CanvasRenderingContext2D): void;
    processInput(input: any): void;
    addComponent(component: GameComponent): void;
    removeComponent(component: GameComponent): void;
}

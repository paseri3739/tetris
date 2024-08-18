import { GameObject } from "./GameObject";

export interface StaticGameObject extends GameObject {
    render(context: CanvasRenderingContext2D): void;
}

import { GameObject } from "./GameObject.js";

export interface StaticGameObject extends GameObject {
    render(context: CanvasRenderingContext2D): void;
}

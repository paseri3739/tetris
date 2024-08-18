import { DynamicGameObject } from "././DynamicGameObject.js";
import { StaticGameObject } from "././StaticGameObject.js";
import { Game } from "./Game.js";
import { InputSystem } from "./input_system/InputSystem.js";

export interface Scene {
    game: Game;
    staticGameObjects: StaticGameObject[];
    dynamicGameObjects: DynamicGameObject[];
    addDynamicGameObject(gameObject: DynamicGameObject): void;
    addStaticGameObject(gameObject: StaticGameObject): void;
    removeDynamicGameObject(gameObject: DynamicGameObject): void;
    removeStaticGameObject(gameObject: StaticGameObject): void;
    update(deltaTime: number): void;
    render(context: CanvasRenderingContext2D): void;
    processInput(input: InputSystem): void;
    close(): void;
}

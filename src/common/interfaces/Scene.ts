import { InputSystem } from "common/input_system/InputSystem.js";
import { Game } from "Game.js";
import { DynamicGameObject } from "./DynamicGameObject.js";
import { StaticGameObject } from "./StaticGameObject.js";

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

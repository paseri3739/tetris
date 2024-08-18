import { Game } from "Game";
import { InputSystem } from "input_system/InputSystem";
import { DynamicGameObject } from "./DynamicGameObject";
import { StaticGameObject } from "./StaticGameObject";

export function isStaticGameObject(gameObject: unknown): gameObject is StaticGameObject {
    return (gameObject as StaticGameObject).position !== undefined;
}

export function isDynamicGameObject(gameObject: unknown): gameObject is DynamicGameObject {
    return (gameObject as DynamicGameObject).state !== undefined;
}

export interface Scene {
    game: Game;
    staticGameObjects: StaticGameObject[];
    dynamicGameObjects: DynamicGameObject[];
    addGameObject(gameObject: DynamicGameObject): void;
    addGameObject(gameObject: StaticGameObject): void;
    removeGameObject(gameObject: DynamicGameObject): void;
    removeGameObject(gameObject: StaticGameObject): void;
    update(deltaTime: number): void;
    render(context: CanvasRenderingContext2D): void;
    processInput(input: InputSystem): void;
    close(): void;
}

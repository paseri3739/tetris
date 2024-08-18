import { InputSystem } from "common/input_system/InputSystem";
import { DynamicGameObject } from "common/interfaces/DynamicGameObject";
import { Scene } from "common/interfaces/Scene";
import { StaticGameObject } from "common/interfaces/StaticGameObject";
import { Game } from "Game";

export class DefaultScene implements Scene {
    game: Game;
    staticGameObjects: StaticGameObject[];
    dynamicGameObjects: DynamicGameObject[];
    constructor(game: Game, staticGameObjects: StaticGameObject[] = [], dynamicGameObjects: DynamicGameObject[] = []) {
        this.game = game;

        this.staticGameObjects = staticGameObjects;
        this.dynamicGameObjects = dynamicGameObjects;
    }
    addDynamicGameObject(gameObject: DynamicGameObject): void {
        this.dynamicGameObjects.push(gameObject);
    }
    addStaticGameObject(gameObject: StaticGameObject): void {
        this.staticGameObjects.push(gameObject);
    }
    removeDynamicGameObject(gameObject: DynamicGameObject): void {
        this.dynamicGameObjects = this.dynamicGameObjects.filter((obj) => obj !== gameObject);
    }
    removeStaticGameObject(gameObject: StaticGameObject): void {
        this.staticGameObjects = this.staticGameObjects.filter((obj) => obj !== gameObject);
    }

    update(deltaTime: number): void {
        this.dynamicGameObjects.forEach((gameObject) => {
            gameObject.update(deltaTime);
        });
    }
    render(context: CanvasRenderingContext2D): void {
        this.staticGameObjects.forEach((gameObject) => {
            gameObject.render(context);
        });
        this.dynamicGameObjects.forEach((gameObject) => {
            gameObject.render(context);
        });
    }
    processInput(input: InputSystem): void {
        this.dynamicGameObjects.forEach((gameObject) => {
            gameObject.processInput(input);
        });
    }
    close(): void {
        this.dynamicGameObjects = [];
        this.staticGameObjects = [];
    }
}

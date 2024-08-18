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
    addDynamicGameObject(dynamicGameObject: DynamicGameObject): void {
        this.dynamicGameObjects.push(dynamicGameObject);
    }
    addStaticGameObject(staticGameObject: StaticGameObject): void {
        this.staticGameObjects.push(staticGameObject);
    }
    removeDynamicGameObject(dynamicGameObject: DynamicGameObject): void {
        this.dynamicGameObjects = this.dynamicGameObjects.filter((obj) => obj !== dynamicGameObject);
    }
    removeStaticGameObject(staticGameObject: StaticGameObject): void {
        this.staticGameObjects = this.staticGameObjects.filter((obj) => obj !== staticGameObject);
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

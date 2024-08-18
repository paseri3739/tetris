import { InputSystem } from "common/input_system/InputSystem";
import { DynamicGameObject } from "common/interfaces/DynamicGameObject";
import { isDynamicGameObject, isStaticGameObject, Scene } from "common/interfaces/Scene";
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

    addGameObject(gameObject: unknown): void {
        if (isStaticGameObject(gameObject)) {
            this.staticGameObjects.push(gameObject);
        }
        if (isDynamicGameObject(gameObject)) {
            this.dynamicGameObjects.push(gameObject);
        }
    }

    removeGameObject(gameObject: unknown): void {
        if (isStaticGameObject(gameObject)) {
            const index = this.staticGameObjects.indexOf(gameObject);
            if (index > -1) {
                this.staticGameObjects.splice(index, 1);
            }
        }
        if (isDynamicGameObject(gameObject)) {
            const index = this.dynamicGameObjects.indexOf(gameObject);
            if (index > -1) {
                this.dynamicGameObjects.splice(index, 1);
            }
        }
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

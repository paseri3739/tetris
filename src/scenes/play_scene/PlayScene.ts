import { Game } from "Game";
import { InputSystem } from "InputSystem";
import { GameObject } from "interfaces/GameObject";
import { Scene } from "interfaces/Scene";

export class PlayScene implements Scene {
    game: Game;
    gameObjects: GameObject[];
    constructor(game: Game) {
        this.game = game;
        this.gameObjects = [];
    }
    addGameObject(gameObject: GameObject): void {
        throw new Error("Method not implemented.");
    }
    removeGameObject(gameObject: GameObject): void {
        throw new Error("Method not implemented.");
    }
    update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }
    render(context: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
    processInput(input: InputSystem): void {
        throw new Error("Method not implemented.");
    }
}

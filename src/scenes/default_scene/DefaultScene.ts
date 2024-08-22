import { InputSystem } from "../../common/input_system/InputSystem.js";
import { DynamicGameObject, GameObjectState } from "../../common/interfaces/DynamicGameObject.js";
import { Scene } from "../../common/interfaces/Scene.js";
import { StaticGameObject } from "../../common/interfaces/StaticGameObject.js";
import { Game } from "../../Game.js";
import { CellSize } from "../../objects/Cell.js";
import { BoundaryCheckComponent } from "../../objects/components/BoundaryCheckComponent.js";
import { MovementComponent } from "../../objects/components/MovementComponent.js";
import { RotationComponent } from "../../objects/components/RotationComponent.js";
import { Grid, GridPixel } from "../../objects/Grid.js";
import { TetriMino, TetriMinoType } from "../../objects/TetriMino.js";

export class DefaultScene implements Scene {
    game: Game;
    staticGameObjects: StaticGameObject[];
    dynamicGameObjects: DynamicGameObject[];

    constructor(game: Game, staticGameObjects: StaticGameObject[] = [], dynamicGameObjects: DynamicGameObject[] = []) {
        this.game = game;

        // 初期化時に静的オブジェクトにグリッドを追加
        this.staticGameObjects = staticGameObjects;
        this.staticGameObjects.push(new Grid(0, 0));

        // 動的オブジェクトの初期化
        this.dynamicGameObjects = dynamicGameObjects;
        this.dynamicGameObjects.push(
            new TetriMino(
                CellSize.Width * 5,
                CellSize.Height * 5,
                0,
                0,
                GameObjectState.Active,
                [],
                TetriMinoType.L,
                new MovementComponent(new BoundaryCheckComponent(GridPixel.Width, GridPixel.Height)),
                new RotationComponent()
            )
        );

        // 初期描画
        this.render(this.game.getContext());
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
        context.clearRect(0, 0, this.game.getCanvas().width, this.game.getCanvas().height);

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

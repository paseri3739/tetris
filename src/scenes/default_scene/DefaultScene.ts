import { CellSize } from "objects/Cell";
import { BoundaryCheckComponent } from "objects/components/BoundaryCheckComponent";
import { MovementComponent } from "objects/components/MovementComponent";
import { PositionComponent } from "objects/components/PositionComponent";
import { RotationComponent } from "objects/components/RotationComponent";
import { TetriMino, TetriMinoType } from "objects/TetriMino";
import { InputSystem } from "../../common/input_system/InputSystem";
import { DynamicGameObject, GameObjectState } from "../../common/interfaces/DynamicGameObject";
import { Scene } from "../../common/interfaces/Scene.js";
import { StaticGameObject } from "../../common/interfaces/StaticGameObject";
import { Game } from "../../Game.js";
import { Grid, GridPixel } from "../../objects/Grid.js";

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
                GameObjectState.Active,
                [],
                TetriMinoType.L,
                new MovementComponent(),
                new PositionComponent(),
                new RotationComponent(),
                new BoundaryCheckComponent(GridPixel.Width, GridPixel.Height)
            )
        );
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

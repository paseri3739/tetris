import { InputSystem } from "../../common/input_system/InputSystem.js";
import { DynamicGameObject, GameObjectState } from "../../common/interfaces/DynamicGameObject.js";
import { Scene } from "../../common/interfaces/Scene.js";
import { Game } from "../../Game.js";
import { GAME_CONFIG } from "../../game_config.js";
import { BoundaryCheckComponent } from "../../objects/components/BoundaryCheckComponent.js";
import { GridMovementComponent } from "../../objects/components/GridMovementComponent.js";
import { RotationComponent } from "../../objects/components/RotationComponent.js";
import { Grid, GridPixel } from "../../objects/Grid.js";
import { TetriMino, TetriMinoType } from "../../objects/TetriMino.js";

export class DefaultScene implements Scene {
    game: Game;
    grid: Grid;
    dynamicGameObjects: DynamicGameObject[] = [];

    constructor(game: Game) {
        this.game = game;

        // 初期化時に静的オブジェクトにグリッドを追加
        this.grid = new Grid(0, 0);

        // 動的オブジェクトの初期化
        this.dynamicGameObjects.push(
            new TetriMino(
                GAME_CONFIG.cell.width * 5,
                GAME_CONFIG.cell.height * 5,
                0,
                0,
                GameObjectState.Active,
                this.grid,
                [],
                TetriMinoType.L,
                new GridMovementComponent(
                    GAME_CONFIG.cell.width,
                    GAME_CONFIG.cell.height,
                    new BoundaryCheckComponent(GridPixel.Width, GridPixel.Height)
                ),
                new RotationComponent()
            )
        );

        // 初期描画
        this.render(this.game.getContext());
    }

    update(deltaTime: number): void {
        this.dynamicGameObjects.forEach((gameObject) => {
            gameObject.update(deltaTime);
        });
        this.grid.update();
    }

    render(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, this.game.getCanvas().width, this.game.getCanvas().height);
        this.grid.render(context);

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
    }
}

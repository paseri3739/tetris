import { InputSystem } from "../../common/input_system/InputSystem";
import { DynamicGameObject, GameObjectState } from "../../common/interfaces/DynamicGameObject";
import { Scene } from "../../common/interfaces/Scene";
import { Game } from "../../Game";
import { GAME_CONFIG } from "../../game_config";
import { BoundaryCheckComponent } from "../../objects/components/BoundaryCheckComponent";
import { GridMovementComponent } from "../../objects/components/GridMovementComponent";
import { RotationComponent } from "../../objects/components/RotationComponent";
import { Grid, GridPixel } from "../../objects/Grid";
import { TetriMino, TetriMinoType } from "../../objects/TetriMino";

export class DefaultScene implements Scene {
    game: Game;
    grid: Grid;
    dynamicGameObjects: DynamicGameObject[] = [];
    movingTetriMino: TetriMino;

    constructor(game: Game) {
        this.game = game;

        this.grid = new Grid(0, 0);

        // 動的オブジェクトの初期化
        this.movingTetriMino = new TetriMino(
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
        );
    }

    update(deltaTime: number): void {
        const column = this.grid.getColumnIndexFromX(this.movingTetriMino.x);
        const row = this.grid.getRowIndexFromY(this.movingTetriMino.y);
        if (this.grid.isWithinBounds(column, row)) {
            this.movingTetriMino.update(deltaTime);
        } else {
            this.movingTetriMino = new TetriMino(
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
            );
        }
        this.grid.update();
    }

    render(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, GAME_CONFIG.canvas.width, GAME_CONFIG.canvas.height);
        this.grid.render(context);
        this.movingTetriMino.render(context);
    }

    processInput(input: InputSystem): void {
        this.movingTetriMino.processInput(input);
    }

    close(): void {
        this.dynamicGameObjects = [];
    }
}

import { InputSystem } from "../../common/input_system/InputSystem";
import { DynamicGameObject, GameObjectState } from "../../common/interfaces/DynamicGameObject";
import { Scene } from "../../common/interfaces/Scene";
import { Game } from "../../Game";
import { GAME_CONFIG } from "../../game_config";
import { Cell } from "../../objects/Cell";
import { BoundaryCheckComponent } from "../../objects/components/BoundaryCheckComponent";
import { GridMovementComponent } from "../../objects/components/GridMovementComponent";
import { RotationComponent } from "../../objects/components/RotationComponent";
import { Grid } from "../../objects/Grid";
import { TetriMino, TetriMinoType } from "../../objects/TetriMino";

export class DefaultScene implements Scene {
    private game: Game;
    private grid: Grid;
    private dynamicGameObjects: DynamicGameObject[] = [];
    private movingTetriMino: TetriMino;

    constructor(game: Game) {
        this.game = game;

        this.grid = new Grid(0, 0);

        // 動的オブジェクトの初期化
        this.movingTetriMino = new TetriMino(
            Grid.gridPositionX(5),
            Grid.gridPositionY(5),
            GameObjectState.Active,
            this.grid,
            [],
            TetriMinoType.L,
            new GridMovementComponent(Cell.cellWidth, Cell.cellHeight, new BoundaryCheckComponent(Grid.width, Grid.height)),
            new RotationComponent()
        );
    }

    getGame(): Game {
        return this.game;
    }

    getDynamicGameObjects(): DynamicGameObject[] {
        return this.dynamicGameObjects;
    }

    update(deltaTime: number): void {
        const column = Grid.getColumnIndexFromX(this.movingTetriMino.getX());
        const row = Grid.getRowIndexFromY(this.movingTetriMino.getY());
        if (this.grid.isWithinBounds(column, row)) {
            this.movingTetriMino.update(deltaTime);
        } else {
            this.movingTetriMino = new TetriMino(
                Grid.gridPositionX(5),
                Grid.gridPositionY(5),
                GameObjectState.Active,
                this.grid,
                [],
                TetriMinoType.L,
                new GridMovementComponent(Cell.cellWidth, Cell.cellHeight, new BoundaryCheckComponent(Grid.width, Grid.height)),
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

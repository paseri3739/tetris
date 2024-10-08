import { DynamicGameObject } from "../../common/interfaces/DynamicGameObject";
import { GameComponent } from "../../common/interfaces/GameComponent";
import { BoundaryCheckComponent } from "./BoundaryCheckComponent"; // パスは適宜変更

export class GridMovementComponent implements GameComponent {
    private owner!: DynamicGameObject & {
        getShape: () => number[][];
    };
    private readonly cellWidth: number;
    private readonly cellHeight: number;
    private directionX: number;
    private directionY: number;
    private boundaryCheckComponent: BoundaryCheckComponent;

    constructor(cellWidth: number, cellHeight: number, boundaryCheckComponent: BoundaryCheckComponent) {
        this.directionX = 0;
        this.directionY = 0;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.boundaryCheckComponent = boundaryCheckComponent;
    }

    update(deltaTime: number): void {
        if (!this.owner) return;

        // 次に移動する予定の位置を計算
        const newX = this.owner.getX() + this.directionX * this.cellWidth;
        const newY = this.owner.getY() + this.directionY * this.cellHeight;

        // 境界内であれば、位置を更新
        this.owner.setX(newX);
        this.owner.setY(newY);

        // 移動後、方向をリセット
        this.directionX = 0;
        this.directionY = 0;
    }

    setOwner(owner: DynamicGameObject & { getShape: () => number[][] }): void {
        this.owner = owner;
        this.boundaryCheckComponent.setOwner(owner);
    }

    getDirection(): { directionX: number; directionY: number } {
        return { directionX: this.directionX, directionY: this.directionY };
    }

    setDirection(directionX: number, directionY: number): void {
        this.directionX = directionX;
        this.directionY = directionY;
    }

    isOufOfBoundary(): boolean {
        return this.boundaryCheckComponent.isOutOfBoundary(this.owner.getShape(), this.owner.getX(), this.owner.getY());
    }
}

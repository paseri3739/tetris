import { DynamicGameObject } from "../../common/interfaces/DynamicGameObject.js";
import { GameComponent } from "../../common/interfaces/GameComponent.js";
import { BoundaryCheckComponent } from "./BoundaryCheckComponent.js"; // パスは適宜変更

export class GridMovementComponent implements GameComponent {
    owner!: DynamicGameObject & { x: number; y: number; getShape: () => number[][]; getX: () => number; getY: () => number };
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
        const newX = this.owner.x + this.directionX * this.cellWidth;
        const newY = this.owner.y + this.directionY * this.cellHeight;

        // 仮の位置をBoundaryCheckComponentで確認
        if (!this.boundaryCheckComponent.isOutOfBoundary()) {
            // 境界内であれば、位置を更新
            this.owner.x = newX;
            this.owner.y = newY;
        }

        // 移動後、方向をリセット
        this.directionX = 0;
        this.directionY = 0;
    }

    setOwner(
        owner: DynamicGameObject & { x: number; y: number; getShape: () => number[][]; getX: () => number; getY: () => number }
    ): void {
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
}

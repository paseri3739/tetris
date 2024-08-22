import { DynamicGameObject } from "../../common/interfaces/DynamicGameObject.js";
import { GameComponent } from "../../common/interfaces/GameComponent.js";

export class BoundaryCheckComponent implements GameComponent {
    owner!: DynamicGameObject & { getShape: () => number[][]; getX: () => number; getY: () => number };
    private isBoundary: boolean;
    private readonly gameWidth: number;
    private readonly gameHeight: number;

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.isBoundary = false;
    }

    update(deltaTime: number): void {
        if (!this.owner) return;

        const shape = this.owner.getShape();
        const posX = this.owner.getX();
        const posY = this.owner.getY();

        this.isBoundary = this.checkBoundary(shape, posX, posY);
    }

    setOwner(owner: DynamicGameObject & { getShape: () => number[][]; getX: () => number; getY: () => number }): void {
        this.owner = owner;
    }

    isOutOfBoundary(): boolean {
        return this.isBoundary;
    }

    private checkBoundary(shape: number[][], x: number, y: number): boolean {
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] !== 0) {
                    // テトリミノの形状内のブロックである場合
                    const cellX = x + col;
                    const cellY = y + row;

                    // 境界外に出ているかをチェック
                    if (cellX < 0 || cellX >= this.gameWidth || cellY < 0 || cellY >= this.gameHeight) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

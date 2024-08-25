import { DynamicGameObject } from "../../common/interfaces/DynamicGameObject.js";
import { GameComponent } from "../../common/interfaces/GameComponent.js";

export class BoundaryCheckComponent implements GameComponent {
    owner!: DynamicGameObject & { getShape: () => number[][]; getX: () => number; getY: () => number };
    private readonly gameWidth: number;
    private readonly gameHeight: number;

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    update(deltaTime: number): void {}

    setOwner(owner: DynamicGameObject & { getShape: () => number[][]; getX: () => number; getY: () => number }): void {
        this.owner = owner;
    }

    isOutOfBoundary(shape: number[][], x: number, y: number): boolean {
        for (let rowIndex = 0; rowIndex < shape.length; rowIndex++) {
            for (let colIndex = 0; colIndex < shape[rowIndex].length; colIndex++) {
                if (shape[rowIndex][colIndex] !== 0) {
                    // テトリミノの形状内のブロックである場合
                    const cellX = x + colIndex;
                    const cellY = y + rowIndex;

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

import { DynamicGameObject } from "../../common/interfaces/DynamicGameObject";
import { GameComponent } from "../../common/interfaces/GameComponent";

export class BoundaryCheckComponent implements GameComponent {
    private owner!: DynamicGameObject;
    private readonly gameWidth: number;
    private readonly gameHeight: number;

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    update(deltaTime: number): void {}

    setOwner(owner: DynamicGameObject): void {
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

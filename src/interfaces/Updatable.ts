/**
 * Updatable インターフェースは、更新メソッドを提供します。
 */
export interface Updatable {
    update(deltaTime: number, ...args: any[]): void;
}

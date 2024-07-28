/**
 * IUpdatable インターフェースは、更新メソッドを提供します。
 */
export interface Updatable {
    update(...args: any[]): void;
}

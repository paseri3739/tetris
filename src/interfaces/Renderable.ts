/**
 * Renderable インターフェースは、描画メソッドを提供します。
 */
export interface Renderable {
    render(context: CanvasRenderingContext2D): void;
}

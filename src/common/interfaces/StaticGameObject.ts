export interface StaticGameObject {
    position: { x: number; y: number };
    render(context: CanvasRenderingContext2D): void;
}

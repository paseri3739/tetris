export interface GameObject {
    update(deltaTime: number, ...args: any[]): void;
    render(context: CanvasRenderingContext2D): void;
}

export class MovementComponent {
    speed: number;
    direction: { x: number; y: number };

    constructor(speed = 1) {
        this.speed = speed;
        this.direction = { x: 0, y: 0 };
    }

    setDirection(x: number, y: number) {
        this.direction = { x: x, y: y };
    }

    updatePosition(position: { x: number; y: number }) {
        position.x += this.direction.x * this.speed;
        position.y += this.direction.y * this.speed;
    }
}

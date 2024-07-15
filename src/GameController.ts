/**
 * GameController class. This class will handle the game controls.
 */
export class GameController {
    private static readonly BUTTONS: Record<string, string> = {
        LEFT: "ArrowLeft",
        RIGHT: "ArrowRight",
        DOWN: "ArrowDown",
        ROTATE: "ArrowUp",
        PAUSE: "Escape",
        START: "Enter",
    };
    constructor() {
        this.activate();
    }

    /**
     * Handle the key down event.
     * @param event KeyboardEvent
     */
    public handleKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case GameController.BUTTONS.LEFT:
                this.moveLeft();
                break;
            case GameController.BUTTONS.RIGHT:
                this.moveRight();
                break;
            case GameController.BUTTONS.DOWN:
                this.moveDown();
                break;
            case GameController.BUTTONS.ROTATE:
                this.rotate();
                break;
            case GameController.BUTTONS.PAUSE:
                this.pause();
                break;
            case GameController.BUTTONS.START:
                this.start();
                break;
        }
    }

    private moveLeft() {}
    private moveRight() {}
    private moveDown() {}
    private rotate() {}
    private pause() {}
    private start() {}
    /**
     * Activate the game controller. This will add the event listener to the document.
     */
    private activate(): void {
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }
}

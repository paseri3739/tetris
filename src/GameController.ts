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
                this.left();
                break;
            case GameController.BUTTONS.RIGHT:
                this.right();
                break;
            case GameController.BUTTONS.DOWN:
                this.down();
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
            default:
                // Do nothing for unrecognized keys
                break;
        }
    }

    /**
     * Trigger a custom event with the specified name.
     * @param eventName string
     */
    private triggerEvent(eventName: string): void {
        const event = new CustomEvent(eventName);
        document.dispatchEvent(event);
    }

    private left() {
        console.log("Move left");
        this.triggerEvent("moveLeft");
    }

    private right() {
        console.log("Move right");
        this.triggerEvent("moveRight");
    }

    private down() {
        console.log("Move down");
        this.triggerEvent("moveDown");
    }

    private rotate() {
        console.log("Rotate");
        this.triggerEvent("rotate");
    }

    private pause() {
        console.log("Pause");
        this.triggerEvent("pause");
    }

    private start() {
        console.log("Start");
        this.triggerEvent("start");
    }

    /**
     * Activate the game controller. This will add the event listener to the document.
     */
    private activate(): void {
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    /**
     * Deactivate the game controller. This will remove the event listener from the document.
     */
    public deactivate(): void {
        document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }
}
